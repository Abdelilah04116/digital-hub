"use client";

import { use } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Chrome } from "lucide-react";

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const t = useTranslations("Login");
    const tc = useTranslations("Common");

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-outfit">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 mb-4">
                        <span className="text-white font-bold text-2xl">D</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">{t("title")}</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <button
                        onClick={() => signIn("google", { callbackUrl: `/${locale}/account` })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all"
                    >
                        <Chrome className="h-5 w-5 text-red-500" />
                        {t("google")}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500 uppercase text-xs font-bold tracking-widest">{t("orEmail")}</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">{t("email")}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="votre@email.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                        >
                            {t("magicLink")}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    {t.rich("termsAccept", {
                        terms: (chunks) => <a href={`/${locale}/legal/terms`} className="underline">{chunks}</a>
                    })}
                </p>
            </div>
        </div>
    );
}
