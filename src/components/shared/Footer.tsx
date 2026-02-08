"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer({ locale }: { locale: string }) {
    const t = useTranslations("Common");
    const tf = useTranslations("Footer");

    const links = [
        {
            title: tf("products"), items: [
                { name: tf("streaming"), href: "/plans" },
                { name: tf("iptv"), href: "/plans" },
                { name: tf("vpn"), href: "/plans" },
                { name: tf("giftCards"), href: "/plans" },
            ]
        },
        {
            title: "Support", items: [
                { name: tf("help"), href: "/support" },
                { name: t("contact"), href: "/support" },
                { name: tf("track"), href: "/account" },
            ]
        },
        {
            title: tf("legal"), items: [
                { name: tf("terms"), href: "/legal/terms" },
                { name: tf("privacy"), href: "/legal/privacy" },
                { name: tf("refund"), href: "/legal/refund" },
            ]
        },
    ];

    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 font-outfit">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">D</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                {t("title")}
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm">
                            {tf("description")}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {links.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-white font-bold mb-6">{group.title}</h3>
                            <ul className="space-y-4 text-sm">
                                {group.items.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="hover:text-indigo-400 transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs">
                        © {new Date().getFullYear()} {t("title")}. {tf("rights")}
                    </p>
                    <div className="flex items-center gap-6 grayscale opacity-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 filter brightness-0 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 filter brightness-0 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 filter brightness-0 invert" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
