import { MetadataRoute } from "next";
import { products } from "@/data/mock";
import { blogPostsByLocale } from "@/data/blog";
import { seoGuides } from "@/data/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://sites-iptv-legal.com";
    const locales = ["fr", "ar", "en"];

    const staticPages = ["", "/plans", "/blog", "/support", "/about", "/login"];

    // 1. Static Pages for each locale
    const staticRoutes = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: page === "" ? 1 : 0.8,
        }))
    );

    // 2. Dynamic Product Pages for each locale
    const productRoutes = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/plans/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    );

    // 3. Dynamic Blog Pages for each locale
    const blogRoutes = locales.flatMap((locale) => {
        const posts = blogPostsByLocale[locale] || [];
        return posts.map((post: any) => ({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: new Date(post.publishedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));
    });

    // 4. SEO Guides for each locale
    const guideRoutes = locales.flatMap((locale) =>
        seoGuides.map((guide) => ({
            url: `${baseUrl}/${locale}/guides/${guide.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    );

    return [...staticRoutes, ...productRoutes, ...blogRoutes, ...guideRoutes];
}

