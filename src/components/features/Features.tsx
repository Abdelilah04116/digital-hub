"use client";

import { useTranslations } from "next-intl";
import { Zap, ShieldCheck, HeartHandshake, CreditCard, Clock, Globe, Users, ShoppingBag, MapPin, Headset } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, { duration: 2, ease: "easeOut" });
            return controls.stop;
        }
    }, [inView, value, count]);

    return (
        <span ref={ref} className="text-3xl font-extrabold text-slate-900">
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export default function Features() {
    const t = useTranslations("Features");
    const tc = useTranslations("Common");

    const items = [
        {
            title: t("speed"),
            description: t("speedDesc"),
            icon: Zap,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: t("secure"),
            description: t("secureDesc"),
            icon: ShieldCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: t("support"),
            description: t("supportDesc"),
            icon: HeartHandshake,
            color: "text-rose-600",
            bg: "bg-rose-50"
        },
        {
            title: t("multi"),
            description: t("multiDesc"),
            icon: Globe,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: t("zero"),
            description: t("zeroDesc"),
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50"
        },
        {
            title: t("local"),
            description: t("localDesc"),
            icon: CreditCard,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    const stats = [
        { label: t("statsClients"), value: 15000, suffix: "+", icon: Users, color: "text-indigo-600" },
        { label: t("statsSubs"), value: 25000, suffix: "+", icon: ShoppingBag, color: "text-emerald-600" },
        { label: t("statsCountries"), value: 12, suffix: "", icon: MapPin, color: "text-rose-600" },
        { label: t("statsSupport"), value: 24, suffix: "/7", icon: Headset, color: "text-blue-600" },
    ];

    return (
        <section className="py-20 bg-slate-50 font-outfit overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                        {t("heading", { title: tc("title") })}
                    </h2>
                    <p className="text-lg text-slate-600">
                        {t("subheading")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-xl group"
                        >
                            <div className={`shrink-0 h-12 w-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center text-center">
                            <div className={`mb-4 p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <p className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
