import { products } from "@/data/mock";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/features/ProductDetailsClient";
import { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
    const locales = ["fr", "ar", "en"];
    return locales.flatMap((locale) =>
        products.map((product) => ({
            locale,
            slug: product.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return {};

    const titles: Record<string, string> = {
        fr: `Acheter ${product.name} | Europe, Maghreb & Moyen-Orient`,
        ar: `اشتري ${product.name} | أوروبا والمغرب العربي والشرق الأوسط`,
        en: `Buy ${product.name} | Europe, North Africa & Middle East`
    };

    const descriptions: Record<string, string> = {
        fr: `Profitez de ${product.name} officiel avec livraison instantanée. Compatible France, Belgique, Algérie, Tunisie, Arabie Saoudite et plus encore. 100% stable.`,
        ar: `استمتع بـ ${product.name} الرسمي مع توصيل فوري. متوافق في فرنسا وبلجيكا والجزائر وتونس والمملكة العربية السعودية والمزيد. مستقر 100٪.`,
        en: `Get official ${product.name} with instant delivery. Compatible in Europe, MENA region and Arab world. 100% high-performance servers.`
    };

    return {
        title: titles[locale] || titles.fr,
        description: descriptions[locale] || descriptions.fr,
        alternates: {
            languages: {
                "x-default": `/en/plans/${slug}`,
                "fr": `/fr/plans/${slug}`,
                "ar": `/ar/plans/${slug}`,
                "en": `/en/plans/${slug}`,
            },
        },
        openGraph: {
            title: titles[locale] || titles.fr,
            description: descriptions[locale] || descriptions.fr,
            images: [product.image],
        }
    };
}


export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) notFound();

    const t = await getTranslations({ locale, namespace: "Common" });
    const tp = await getTranslations({ locale, namespace: "Products" });
    const localizedDescription = tp(`${product.slug}.description`);

    // Product Schema JSON-LD
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": localizedDescription,
        "image": product.image,
        "brand": {
            "@type": "Brand",
            "name": "Digital Subs Morocco"
        },
        "offers": product.plans.map((plan) => ({
            "@type": "Offer",
            "name": plan.name,
            "price": plan.price,
            "priceCurrency": "MAD",
            "availability": "https://schema.org/InStock",
            "url": `https://sites-iptv-legal.com/${locale}/plans/${slug}`,
            "priceValidUntil": "2026-12-31",
            "seller": {
                "@type": "Organization",
                "name": "Digital Subs Morocco"
            }
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    // Breadcrumbs data
    const breadcrumbItems = [
        { label: t("plans"), href: "/plans" },
        { label: product.name }
    ];

    return (
        <>
            <JsonLd data={productSchema} />
            <div className="py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs items={breadcrumbItems} locale={locale} />
                    <ProductDetailsClient product={product} locale={locale} />
                </div>
            </div>
        </>
    );
}
