import { Check } from "lucide-react";

interface SEOPageProps {
    title: string;
    description: string;
    content: string;
    faq?: { q: string, a: string }[];
}

export default function SEOPageTemplate({ title, description, content, faq }: SEOPageProps) {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6 font-outfit">{title}</h1>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed">{description}</p>

                <div className="prose prose-slate prose-indigo max-w-none mb-16">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {faq && (
                    <div className="mt-20 border-t border-slate-100 pt-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Questions fréquentes sur {title}</h2>
                        <div className="space-y-6">
                            {faq.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-2xl">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                                    <p className="text-slate-600">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
