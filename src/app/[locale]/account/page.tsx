import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShoppingBag, Key, User, Download, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(`/${locale}/login`);
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        include: {
            subscriptions: { include: { plan: { include: { product: true } } } },
            orders: { include: { plan: { include: { product: true } } } },
        },
    });

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-2">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-6 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 truncate max-w-[140px]">{session.user?.name || "Client"}</p>
                                <p className="text-xs text-slate-500 uppercase font-bold">Mon Profil</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 text-indigo-600 font-bold text-sm shadow-sm transition-all">
                                <ShoppingBag className="h-4 w-4" />
                                Mes Abonnements
                            </a>
                            <a href={`/${locale}/support`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium text-sm hover:bg-slate-100 transition-all">
                                <Key className="h-4 w-4" />
                                Support & Aide
                            </a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-outfit">Abonnements Actifs</h2>
                            {user?.subscriptions.length === 0 ? (
                                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
                                    <p className="text-slate-500 mb-6">Vous n'avez pas encore d'abonnement actif.</p>
                                    <a href={`/${locale}/plans`} className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700">
                                        Voir les offres
                                    </a>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {user?.subscriptions.map((sub: any) => (
                                        <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                                                    <img src={sub.plan.product.image || ""} alt="" className="max-h-full max-w-full" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{sub.plan.product.name}</h3>
                                                    <p className="text-xs text-slate-500">Expire le {sub.endDate.toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-100 uppercase">Actif</span>
                                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                                    Instructions <ExternalLink className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-outfit">Historique des commandes</h2>
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4">Commande</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Montant</th>
                                            <th className="px-6 py-4">Facture</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {user?.orders.map((order: any) => (
                                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">#{order.id.slice(-6).toUpperCase()}</p>
                                                    <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{order.plan.product.name}</p>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{order.createdAt.toLocaleDateString()}</td>
                                                <td className="px-6 py-4 font-bold text-indigo-600">{formatPrice(order.amount)}</td>
                                                <td className="px-6 py-4">
                                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                        <Download className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
