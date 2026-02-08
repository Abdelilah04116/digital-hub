import { CheckCircle2, Copy, Mail, ExternalLink, MessageCircle } from "lucide-react";

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <div className="py-20 lg:py-32 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200 border border-slate-100 text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 font-outfit">Paiement Réussi !</h1>
                    <p className="text-lg text-slate-600 mb-12">
                        Merci pour votre confiance. Votre abonnement a été activé avec succès.
                        Un email de confirmation vous a été envoyé.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-12 text-left border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ExternalLink className="h-5 w-5 text-indigo-600" />
                            Instructions d'activation
                        </h3>
                        <ul className="space-y-4 text-slate-600 text-sm">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">1</span>
                                <span>Connectez-vous à votre plateforme habituelle (Netflix, MyCanal, etc.).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">2</span>
                                <span>Utilisez les identifiants reçus par email ou disponibles sur votre compte.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">3</span>
                                <span>En cas de besoin, contactez notre support WhatsApp immédiatement.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                            href={`/${locale}/account`}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 font-bold text-white hover:bg-black transition-all"
                        >
                            Voir mon compte
                        </a>
                        <a
                            href="https://wa.me/+212600000000"
                            target="_blank"
                            className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 py-4 font-bold text-white hover:bg-green-600 transition-all"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Support WhatsApp
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center text-slate-400 text-sm flex items-center justify-center gap-6">
                    <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@sites-iptv-legal.com</span>
                    <span>Commande #ORD-{Math.floor(Math.random() * 10000)}</span>
                </div>
            </div>
        </div>
    );
}
