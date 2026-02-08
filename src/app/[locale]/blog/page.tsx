import { blogPostsByLocale } from "@/data/blog";
import { format, parseISO } from "date-fns";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';
import Image from "next/image";
import { Link } from "@/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Blog" });

    return {
        title: t("listingTitle"),
        description: t("listingSubtitle"),
        alternates: {
            canonical: `/${locale}/blog`,
            languages: {
                "fr": "/fr/blog",
                "ar": "/ar/blog",
                "en": "/en/blog",
            },
        },
    };
}

export default async function BlogListingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Blog" });
    const tc = await getTranslations({ locale, namespace: "Common" });
    const posts = blogPostsByLocale[locale] || blogPostsByLocale['en'];

    return (
        <div className="py-20 lg:py-32 font-outfit">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                        {t("listingTitle")}
                    </h1>
                    <p className="text-lg text-slate-600">
                        {t("listingSubtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all"
                        >
                            <div className="aspect-video overflow-hidden">
                                <Image src={post.image} alt={post.title} width={400} height={225} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <span className="text-xs font-bold text-indigo-600 uppercase mb-4 tracking-wider">
                                    {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}
                                </span>
                                <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-sm">
                                    {tc("readMore")}
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
