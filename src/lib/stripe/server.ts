import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is not configured");
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2023-10-16" as any,
            typescript: true,
        });
    }
    return stripeInstance;
}

export const stripe = new Proxy({} as Stripe, {
    get: (target, prop) => {
        const instance = getStripe();
        const value = (instance as any)[prop];
        return typeof value === 'function' ? value.bind(instance) : value;
    }
});
