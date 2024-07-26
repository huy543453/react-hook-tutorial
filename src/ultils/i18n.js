import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        // resources: {
        //     en: {
        //         translation: {
        //             // here we will place our translations...
        //             homepage: {
        //                 title1: "Make forms worth filling out",
        //                 title2: `Get more data—like signups, feedback, and anything
        //                 else—with forms designed to be`,
        //                 title2b: `refreshingly different.`,
        //                 title3: "Get started—it's free",
        //             },
        //         },
        //     },
        //     vi: {
        //         translation: {
        //             // here we will place our translations...
        //             homepage: {
        //                 title1: "Có rất nhiều cách để hỏi",
        //                 title2: `CHịu chêt không hiểu`,
        //                 title2b: `Tự tìm nhé.`,
        //                 title3: "Nó là miễn phí",
        //             },
        //         },
        //     },
        // },
    });

export default i18n;
