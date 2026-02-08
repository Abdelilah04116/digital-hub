import { MessageCircle, Mail, Clock, HelpCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Support" });

    return (
        <div className="py-20 lg:py-32 bg-white font-outfit">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t("title")}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <a href="https://wa.me/+212600000000" className="flex flex-col items-center text-center p-8 rounded-3xl bg-green-50 border border-green-100 transition-all hover:shadow-xl group">
                        <div className="h-16 w-16 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-100">
                            <MessageCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
                        <p className="text-sm text-slate-500 mb-4">{t("whatsappResponse")}</p>
                        <span className="text-green-600 font-bold">{t("contactUs")} →</span>
                    </a>

                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
                        <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                            <Clock className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{t("availability")}</h3>
                        <p className="text-sm text-slate-500">{t("monSun")}</p>
                        <span className="text-slate-900 font-bold mt-4">09:00 - 22:00</span>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-slate-100">
                            <Mail className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                        <p className="text-sm text-slate-500 mb-4">{t("emailResponse")}</p>
                        <span className="text-slate-900 font-bold">support@sitesiptv.com</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                            <HelpCircle className="h-8 w-8 text-indigo-600" />
                            {t("openTicket")}
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">{t("fullName")}</label>
                                    <input type="text" className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Ahmed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">{t("email")}</label>
                                    <input type="email" className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="votre@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t("subject")}</label>
                                <select className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                                    <option>{t("activationProblem")}</option>
                                    <option>{t("preSales")}</option>
                                    <option>{t("paymentNotReceived")}</option>
                                    <option>{t("other")}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t("message")}</label>
                                <textarea rows={6} className="w-full rounded-xl border border-slate-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder={t("placeholderMessage")}></textarea>
                            </div>
                            <button className="w-full rounded-2xl bg-indigo-600 py-5 font-bold text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                                {t("send")}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-8 bg-slate-50 p-10 rounded-3xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("quickHelp")}</h2>
                        <p className="text-slate-600 mb-8">{t("helpSubtitle")}</p>

                        <div className="space-y-4">
                            {[
                                t("activationGuide"),
                                t("changePlan"),
                                t("guarantees"),
                                t("lostPassword")
                            ].map((item) => (
                                <a key={item} href="#" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-indigo-600 transition-all font-medium text-slate-700">
                                    {item}
                                    <span className="text-indigo-600">→</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
