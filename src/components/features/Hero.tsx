"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Headset } from "lucide-react";

export default function Hero({ locale }: { locale: string }) {
    const t = useTranslations("Hero");
    const commonT = useTranslations("Common");

    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-50/50 blur-3xl opacity-50" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        {t("badge")}
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-8 font-outfit">
                        {t.rich("title", {
                            br: () => <br />,
                            span: (chunks) => <span className="text-indigo-600">{chunks}</span>
                        })}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600 lg:text-xl mb-10 leading-relaxed">
                        {t("subtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`/${locale}/plans`}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95"
                        >
                            {t("cta")}
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <a
                            href={`https://wa.me/+212600000000`}
                            target="_blank"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 ring-1 ring-slate-200 transition-all hover:bg-slate-50"
                        >
                            {commonT("whatsapp")}
                        </a>
                    </div>
                </motion.div>

                {/* Feature Icons */}
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-12">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-slate-900">{t("speed")}</h3>
                        <p className="text-sm text-slate-500 text-center">{t("speedDesc")}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-slate-900">{t("payment")}</h3>
                        <p className="text-sm text-slate-500 text-center">{t("paymentDesc")}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                            <Headset className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-slate-900">{t("support")}</h3>
                        <p className="text-sm text-slate-500 text-center">{t("supportDesc")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
