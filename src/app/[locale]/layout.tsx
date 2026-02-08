import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import JsonLd from "@/components/shared/JsonLd";
import { Providers } from "@/components/shared/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Subs Morocco",
  "url": "https://sites-iptv-legal.com",
  "logo": "https://sites-iptv-legal.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+212-600-000-000",
    "contactType": "customer service",
    "availableLanguage": ["French", "Arabic"]
  }
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sites-iptv-legal.com"),
  title: {
    default: "Digital Subs - Abonnements Officiels (Europe, Maghreb & Moyen-Orient)",
    template: "%s | Digital Subs"
  },
  description: "Solution n°1 pour vos abonnements digitaux (IPTV stable, Netflix, Disney+, VPN) en Europe, Afrique du Nord et Moyen-Orient. Livraison instantanée 24/7, serveurs haute performance et support premium.",
  keywords: ["IPTV stable Europe", "IPTV France Belgique Suisse", "IPTV Maroc Algérie Tunisie", "IPTV Saudi Arabia UAE", "Netflix pas cher", "Abonnement Streaming International", "Digital Subs"],
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      "fr": "/fr",
      "ar": "/ar",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sites-iptv-legal.com",
    siteName: "Digital Subs Global",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Subs Global - Abonnements Digitaux Officiels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Subs - Abonnements Digitaux Internationaux",
    description: "Le meilleur du streaming et IPTV en Europe et dans le monde arabe.",
    images: ["/og-image.png"],
  },
};


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="bg-[#FBFCFE] text-slate-900 antialiased font-sans">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <Header locale={locale} />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer locale={locale} />
            <WhatsAppButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
