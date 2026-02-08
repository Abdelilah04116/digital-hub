"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Check, ShieldCheck, Zap, MessageCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

interface Plan {
    id: string;
    name: string;
    price: number;
    duration: number;
    stripePriceId?: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    plans: Plan[];
}

const PRODUCT_GALLERIES: Record<string, string[]> = {
    "netflix-premium": [
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=400",
    ],
    "disney-plus": [
        "https://images.unsplash.com/photo-1559981421-3e0c0d712e3b?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1601850494422-3cf14624b0bb?auto=format&fit=crop&q=80&w=400",
    ],
    "iptv-platinum": [
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
    ],
    "iptv-gold": [
        "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&q=80&w=400",
    ]
};

function RollingGallery({ images }: { images: string[] }) {
    return (
        <div className="relative mb-16 overflow-hidden py-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
            <motion.div
                className="flex gap-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                style={{ width: "fit-content" }}
            >
                {[...images, ...images].map((img, i) => (
                    <div key={i} className="shrink-0 w-64 h-36 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
                        <Image src={img} alt="Preview" fill className="object-cover" sizes="256px" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function ProductDetailsClient({ product, locale }: { product: Product, locale: string }) {
    const t = useTranslations("Product");
    const tc = useTranslations("Common");
    const tp = useTranslations("Products");
    const [selectedPlan, setSelectedPlan] = useState(product.plans[0]);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const gallery = PRODUCT_GALLERIES[product.slug];

    const handleCheckout = async () => {
        if (!session) {
            router.push(`/${locale}/login?callbackUrl=/${locale}/plans/${product.slug}`);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planId: selectedPlan.id,
                    priceId: selectedPlan.stripePriceId || "price_dummy",
                    successUrl: `${window.location.origin}/${locale}/checkout/success`,
                    cancelUrl: `${window.location.origin}/${locale}/plans/${product.slug}`,
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(t("checkoutError"));
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert(t("errorOccurred"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-outfit">
            {/* Rolling Gallery for specific products */}
            {gallery && <RollingGallery images={gallery} />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Image & Trust */}
                <div className="space-y-8">
                    <div className="aspect-video rounded-3xl bg-white border border-slate-200 p-12 flex items-center justify-center shadow-sm">
                        <Image src={product.image} alt={product.name} width={400} height={225} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <ShieldCheck className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-medium">{t("official")}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <Zap className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-medium">{t("instant")}</span>
                        </div>
                    </div>
                </div>

                {/* Info & Pricing */}
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
                    <p className="text-lg text-slate-600 mb-8">{tp(`${product.slug}.description`)}</p>

                    <div className="space-y-6 mb-10">
                        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">{t("chooseDuration")}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {product.plans.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`group relative flex flex-col p-4 rounded-2xl border-2 transition-all text-left ${selectedPlan.id === plan.id
                                        ? "border-indigo-600 bg-indigo-50/50"
                                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <span className={`text-sm font-bold mb-1 ${selectedPlan.id === plan.id ? "text-indigo-600" : "text-slate-500"
                                        }`}>
                                        {plan.name}
                                    </span>
                                    <span className="text-xl font-extrabold text-slate-900">{formatPrice(plan.price)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mb-4"
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : t("proceed")}
                    </button>

                    <a
                        href={`https://wa.me/+212600000000?text=${t("waGreeting")} ${product.name} - ${selectedPlan.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-100 py-5 text-lg font-bold text-slate-600 transition-all hover:border-slate-200"
                    >
                        <MessageCircle className="h-5 w-5" />
                        {t("buyWhatsApp")}
                    </a>

                    <div className="mt-12 space-y-4">
                        <h4 className="font-bold text-slate-900 underline decoration-indigo-500 underline-offset-4">{t("included")}</h4>
                        <ul className="space-y-3">
                            {[
                                t("guaranteedAccess"),
                                t("techSupport"),
                                t("clearInstructions"),
                                t("secureStripe")
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-slate-600 text-sm">
                                    <Check className="h-4 w-4 text-indigo-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
