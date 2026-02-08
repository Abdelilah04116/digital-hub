import { legalPages } from "@/data/legal";
import { notFound } from "next/navigation";

export default function LegalPage({ params: { slug } }: { params: { slug: string } }) {
    const page = legalPages.find(p => p.slug === slug);

    if (!page) notFound();

    return (
        <div className="py-20 lg:py-32 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-12 font-outfit">{page.title}</h1>
                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
        </div>
    );
}
