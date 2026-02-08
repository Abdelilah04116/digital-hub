import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "fr",
});

export const config = {
    // Matcher corresponding to the way next-intl expects it
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
