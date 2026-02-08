"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({ locale }: { locale: string }) {
    const t = useTranslations("Common");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("plans"), href: "/plans" },
        { name: t("blog"), href: "/blog" },
        { name: t("support"), href: "/support" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">D</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                            {t("title")}
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <LocaleSwitcher currentLocale={locale} />

                    <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                    <button className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                            0
                        </span>
                    </button>

                    <Link
                        href="/login"
                        className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                    >
                        <User className="h-4 w-4" />
                        {t("login")}
                    </Link>

                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-4 flex flex-col gap-2">
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <User className="h-4 w-4" />
                            {t("login")}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
