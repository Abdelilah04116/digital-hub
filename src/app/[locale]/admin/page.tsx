import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, ShoppingBag, CreditCard, Ticket as TicketIcon } from "lucide-react";

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect(`/${locale}/login`);
    }

    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
        _sum: { amount: true },
        where: { status: "SUCCESS" }
    });
    const openTickets = await prisma.ticket.count({ where: { status: "OPEN" } });

    const stats = [
        { name: "Utilisateurs", value: userCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Commandes", value: orderCount, icon: ShoppingBag, color: "text-indigo-600", bg: "bg-indigo-50" },
        { name: "Revenu Total", value: `${totalRevenue._sum.amount || 0} MAD`, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Tickets Ouverts", value: openTickets, icon: TicketIcon, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 font-outfit">Administration</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900">Commandes Récentes</h2>
                        <button className="text-indigo-600 font-bold text-sm hover:underline">Voir tout</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Produit</th>
                                    <th className="px-6 py-4">Montant</th>
                                    <th className="px-6 py-4">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 uppercase">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-slate-400">#ORD-001</td>
                                    <td className="px-6 py-4 text-slate-900 font-medium">Ahmed El Amrani</td>
                                    <td className="px-6 py-4">Netflix Premium</td>
                                    <td className="px-6 py-4 font-bold">65 MAD</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-green-700">Success</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
