import { Link } from "@/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    locale: string;
}

export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="flex items-center gap-2 text-sm text-slate-600"
            >
                {/* Home */}
                <li
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                >
                    <Link
                        itemProp="item"
                        href="/"
                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span itemProp="name" className="sr-only">Accueil</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>

                {/* Dynamic items */}
                {items.map((item, index) => (
                    <li
                        key={index}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                        className="flex items-center gap-2"
                    >
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                        {item.href ? (
                            <Link
                                itemProp="item"
                                href={item.href}
                                className="hover:text-indigo-600 transition-colors"
                            >
                                <span itemProp="name">{item.label}</span>
                            </Link>
                        ) : (
                            <span itemProp="name" className="font-medium text-slate-900">
                                {item.label}
                            </span>
                        )}
                        <meta itemProp="position" content={String(index + 2)} />
                    </li>
                ))}
            </ol>
        </nav>
    );
}
