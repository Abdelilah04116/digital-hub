import { seoGuides } from "@/data/seo-pages";
import { notFound } from "next/navigation";
import SEOPageTemplate from "@/components/shared/SEOPageTemplate";
import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
    const locales = ["fr", "ar", "en"];
    return locales.flatMap((locale) =>
        seoGuides.map((guide) => ({
            locale,
            slug: guide.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guide = seoGuides.find((g) => g.slug === slug);
    if (!guide) return {};

    return {
        title: guide.title,
        description: guide.description,
    };
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const guide = seoGuides.find((g) => g.slug === slug);

    if (!guide) notFound();

    const t = await getTranslations({ locale, namespace: "Common" });

    // FAQ Schema
    const faqSchema = guide.faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": guide.faq.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    } : null;

    const breadcrumbItems = [
        { label: t("home"), href: "/" },
        { label: guide.title }
    ];

    return (
        <>
            {faqSchema && <JsonLd data={faqSchema} />}
            <div className="pt-10 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Breadcrumbs items={breadcrumbItems} locale={locale} />
                </div>
                <SEOPageTemplate
                    title={guide.title}
                    description={guide.description}
                    content={guide.content}
                    faq={guide.faq}
                />
            </div>
        </>
    );
}

