"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Image from "next/image";
import { products } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Check } from "lucide-react";

export default function TrendingPlans({ locale }: { locale: string }) {
    const t = useTranslations("Trending");
    const tc = useTranslations("Common");

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl font-outfit">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-slate-600">
                            {t("subtitle")}
                        </p>
                    </div>
                    <a
                        href={`/${locale}/plans`}
                        className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                        {tc("seeOffers")}
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.filter(p => p.featured).map((product) => {
                        const starterPlan = product.plans[0];
                        return (
                            <Link
                                key={product.id}
                                href={`/plans/${product.slug}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={225}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.bestSeller && (
                                        <div className="absolute top-4 left-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white shadow-sm">
                                            {t("bestSeller")}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="text-indigo-600 font-bold">
                                            {tc("from")} {formatPrice(starterPlan.price)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <ul className="mb-8 space-y-3 text-sm text-slate-600 flex-1">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {t("stable")}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {t("priority")}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {t("guarantee")}
                                        </li>
                                    </ul>

                                    <div className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-600 group-hover:bg-indigo-600 shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
                                        <ShoppingCart className="h-4 w-4" />
                                        {tc("order")}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
