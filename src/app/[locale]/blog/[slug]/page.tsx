import { blogPostsByLocale } from "@/data/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import JsonLd from "@/components/shared/JsonLd";

export async function generateStaticParams() {
    const locales = ["fr", "ar", "en"];
    return locales.flatMap((locale) =>
        (blogPostsByLocale[locale] || []).map((post: any) => ({
            locale,
            slug: post.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const posts = blogPostsByLocale[locale] || blogPostsByLocale['en'];
    const post = posts.find((p) => p.slug === slug);

    if (!post) return {};

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `/${locale}/blog/${slug}`,
            languages: {
                "fr": `/fr/blog/${slug}`,
                "ar": `/ar/blog/${slug}`,
                "en": `/en/blog/${slug}`,
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: "article",
            publishedTime: post.publishedAt,
        }
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: "Blog" });
    const tc = await getTranslations({ locale, namespace: "Common" });
    const posts = blogPostsByLocale[locale] || blogPostsByLocale['en'];
    const post = posts.find((p) => p.slug === slug);

    if (!post) notFound();

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.publishedAt,
        "author": {
            "@type": "Organization",
            "name": "Digital Subs Morocco"
        }
    };

    const breadcrumbItems = [
        { label: tc("blog"), href: "/blog" },
        { label: post.title }
    ];

    return (
        <>
            <JsonLd data={articleSchema} />
            <article className="py-20 lg:py-32 font-outfit">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Breadcrumbs items={breadcrumbItems} locale={locale} />
                    <div className="mb-12 text-center">
                        <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                            {t("news")}
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl relative">
                        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                    </div>

                    <div
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-outfit prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-indigo-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-20 p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4">{t("needSub")}</h2>
                            <p className="text-slate-300 text-lg mb-8">
                                {t("exploreOffers")}
                            </p>
                            <a
                                href={`/${locale}/plans`}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-indigo-500 font-bold text-white hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25"
                            >
                                {tc("seeOffers")}
                            </a>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-indigo-500/10 skew-x-12 translate-x-1/2"></div>
                    </div>
                </div>
            </article>
        </>
    );
}

