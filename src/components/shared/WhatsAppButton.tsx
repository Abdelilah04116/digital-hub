"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhatsAppButton() {
    const t = useTranslations("Common");
    const whatsappNumber = "+212600000000"; // Placeholder

    return (
        <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
            aria-label={t("whatsapp")}
        >
            <MessageCircle className="h-7 w-7 fill-current" />
        </a>
    );
}
