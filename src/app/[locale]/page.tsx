import Hero from "@/components/features/Hero";
import TrendingPlans from "@/components/features/TrendingPlans";
import Features from "@/components/features/Features";
import FAQ from "@/components/shared/FAQ";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const translations: any = {
    fr: {
      title: "IPTV Stable (Europe & Monde Arabe) & Streaming Officiel - Digital Subs",
      description: "Profitez d'un IPTV stable sans coupure en France, Belgique, Suisse et tout le Maghreb. Abonnements Netflix et Disney+ officiels. Support 24/7 et serveurs haute performance."
    },
    ar: {
      title: "IPTV مستقر (أوروبا والعالم العربي) وبث رسمي - Digital Subs",
      description: "استمتع بـ IPTV مستقر بـدون تقطيع في أوروبا والمغرب العربي والشرق الأوسط. اشتراكات Netflix و Disney+ رسمية. دعم 24/7 وخوادم عالية الأداء."
    },
    en: {
      title: "Stable IPTV (Europe & Arab World) & Streaming - Digital Subs",
      description: "High-performance stable IPTV in Europe and Middle East. Official Netflix and Disney+ subscriptions. 24/7 support and worldwide servers."
    }
  };

  const { title, description } = translations[locale] || translations.fr;

  return {
    title,
    description,
    keywords: ["IPTV stable Europe", "IPTV France sans coupure", "IPTV Saudi Arabia", "IPTV UAE", "IPTV Algeria Tunisia", "Best IPTV 2026", "Digital Subs"],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'x-default': '/',
        'fr': '/fr',
        'ar': '/ar',
        'en': '/en',
      }
    }
  };
}


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <Features />
      <TrendingPlans locale={locale} />
      <FAQ />
    </>
  );
}
