import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (!userId || !planId) {
            return new NextResponse("Webhook Error: Metadata missing", { status: 400 });
        }

        // Update database
        await prisma.order.create({
            data: {
                userId,
                planId,
                amount: session.amount_total! / 100,
                status: "SUCCESS",
                stripeSessionId: session.id,
            },
        });

        // Create subscription
        const plan = await prisma.plan.findUnique({ where: { id: planId } });
        if (plan) {
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + plan.duration);

            await prisma.subscription.create({
                data: {
                    userId,
                    planId,
                    endDate,
                    status: "ACTIVE",
                },
            });
        }

        // Send email confirmation via Resend
        try {
            const { resend } = await import("@/lib/resend/client");
            await resend.emails.send({
                from: "Digital Subs <onboarding@resend.dev>",
                to: session.customer_email!,
                subject: "Confirmation de votre commande - Digital Subs",
                html: `
                    <h1>Merci pour votre achat !</h1>
                    <p>Votre commande a été confirmée.</p>
                    <p>Vous pouvez accéder à vos accès dans votre espace client.</p>
                    <a href="${process.env.NEXTAUTH_URL}/account">Mon Compte</a>
                `,
            });
        } catch (emailError) {
            console.error("[EMAIL_ERROR]", emailError);
        }
    }

    return new NextResponse(null, { status: 200 });
}
