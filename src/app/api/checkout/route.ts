import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { planId, priceId, successUrl, cancelUrl } = await req.json();

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "payment", // or "subscription" for recurring
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                userId: session.user.id,
                planId: planId,
            },
            customer_email: session.user.email!,
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse(error.message, { status: 500 });
    }
}
