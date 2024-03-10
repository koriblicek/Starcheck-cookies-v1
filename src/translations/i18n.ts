import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: 'gb',
        resources: {
            gb: {
                translation: {
                    controls: {
                        close: 'Close',
                        accept_all: 'Accept all',
                        accept_selected: 'Accept selected',
                        save_and_close: 'Save and close',
                        reject_all: 'Reject all',
                        customize: 'Customize',
                        more_details: 'More details',
                        cookie_necessary: 'Necessary',
                        cookie_preferences: 'Preferences',
                        cookie_statistics: 'Statistics',
                        cookie_marketing: 'Marketing',
                        cookie_unclasified: 'Unclasified',
                        cookie_declaration: 'Cookie declaration',
                        about_cookies: 'About Cookies',
                    },
                    titles: {
                        cookie_settings: "Cookie Settings",
                        starcheck: 'Starcheck.sk',
                    },
                    dialogs: {
                        using_cookies_title: "This website uses cookies",
                        using_cookies_text: "We use cookies to improve user experience. Choose what cookies you allow us to use.",
                        about_cookies_text: "A cookie, in the context of computers and the internet, is a small piece of data that a website sends to your browser and is stored on your computer or other device. Cookies are used to remember information about you, such as your preferences or login credentials, which can enhance your browsing experience or streamline certain website functions.",
                        cookie_necessary_explanation: "Necessary cookies, also known as essential cookies, are cookies that are strictly necessary for a website to function properly and provide basic functionalities. These cookies do not require user consent because they are essential for the operation of the website and do not collect any personal information beyond what is necessary.",
                        cookie_preferences_explanation: "Preference cookies, also known as functional cookies, are cookies that are used to remember user preferences and choices to provide a more personalized browsing experience. Unlike necessary cookies, which are essential for the basic functionality of a website, preference cookies are not strictly required but are used to enhance the user experience.",
                        cookie_statistics_explanation: "Statistics cookies, also known as analytics cookies, are used to collect information about how visitors interact with a website. These cookies gather data such as the number of visitors to the website, the pages they visit, the duration of their visit, and the sources from which they arrived. The information collected is typically aggregated and anonymized, meaning that individual users cannot be identified.",
                        cookie_marketing_explanation: "Marketing cookies, also referred to as advertising cookies, are cookies that track users across websites to build a profile of their interests and preferences. These cookies are used by advertisers and marketers to deliver targeted advertisements to users based on their browsing history and behavior.",
                        cookie_unclasified_explanation: "'Unclassified cookies' typically refer to cookies that do not fall into predefined categories such as necessary, preference, statistics, or marketing cookies. These cookies may have various purposes or functions depending on how they are used by the website.",
                    },
                    label: {

                    },
                    message: {
                    },
                    languages: {
                        sk: 'Slovak',
                        gb: 'English',
                    },
                }
            },
            sk: {
                translation: {
                    buttons: {
                        close: 'Zatvoriť',
                    },
                    title: {
                    },
                    text: {
                    },
                    label: {
                    },
                    message: {
                    },
                    languages: {
                        sk: 'Slovensky',
                        gb: 'Anglicky',
                    },
                }
            }
        }
    });