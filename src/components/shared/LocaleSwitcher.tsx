"use client";

import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
    { name: "Français", code: "fr" },
    { name: "العربية", code: "ar" },
    { name: "English", code: "en" },
];

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
    const pathname = usePathname();

    const getRedirectPath = (newLocale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = newLocale;
        return segments.join("/");
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-1.5 p-2 text-slate-600 hover:text-indigo-600 transition-colors uppercase text-xs font-bold">
                <Globe className="h-4 w-4" />
                <span>{currentLocale}</span>
            </button>

            <div className="absolute right-0 top-full mt-1 hidden w-32 origin-top-right rounded-lg border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block transition-all">
                {languages.map((lang) => (
                    <a
                        key={lang.code}
                        href={getRedirectPath(lang.code)}
                        className={cn(
                            "block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors",
                            currentLocale === lang.code && "bg-slate-50 font-bold text-indigo-600"
                        )}
                    >
                        {lang.name}
                    </a>
                ))}
            </div>
        </div>
    );
}
