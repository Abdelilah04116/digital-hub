import { products, categories } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/navigation";

export default async function PlansPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Plans" });
    const tc = await getTranslations({ locale, namespace: "Common" });
    const tcat = await getTranslations({ locale, namespace: "Categories" });

    return (
        <div className="py-20 font-outfit">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t("title")}</h1>
                    <p className="text-lg text-slate-600">{t("subtitle")}</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                    <button className="rounded-full bg-slate-900 px-6 py-2 text-sm font-bold text-white shadow-lg">{t("all")}</button>
                    {categories.map((cat) => (
                        <button key={cat.id} className="rounded-full bg-white px-6 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 hover:ring-indigo-600 hover:text-indigo-600 transition-all">
                            {tcat(cat.id)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/plans/${product.slug}`}
                            className="group flex flex-col rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl"
                        >
                            <div className="aspect-square overflow-hidden bg-slate-100 p-8 flex items-center justify-center">
                                <Image src={product.image} alt={product.name} width={300} height={300} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{product.name}</h3>
                                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-bold text-indigo-600">{tc("from")} {formatPrice(product.plans[0].price)}</span>
                                    <div className="rounded-full bg-slate-100 p-2 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <ShoppingCart className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
