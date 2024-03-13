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
                        created_by_starcheck_sk: 'Created by STARCHECK.SK'
                    },
                    titles: {
                        cookie_settings: "Cookie Settings",
                        starcheck_sk: 'starcheck.sk',
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
                    languages: {
                        sk: 'Slovak',
                        gb: 'English',
                    },
                }
            },
            sk: {
                translation: {
                    controls: {
                        close: "Zavrieť",
                        accept_all: "Prijať všetky",
                        accept_selected: "Prijať vybrané",
                        save_and_close: "Uložiť a zavrieť",
                        reject_all: "Zamietnuť všetky",
                        customize: "Prispôsobiť",
                        more_details: "Viac informácií",
                        cookie_necessary: "Nevyhnutne potrebné",
                        cookie_preferences: "Preferenčné",
                        cookie_statistics: "Štatistické",
                        cookie_marketing: "Cielené",
                        cookie_unclasified: "Neklasifikované",
                        cookie_declaration: "Vyhlásenie o cookies",
                        about_cookies: "O cookies",
                        created_by_starcheck_sk: "Vytvorené spoločnosťou STARCHECK.SK",
                    },
                    titles: {
                        cookie_settings: "Nastavenia cookie",
                        starcheck_sk: 'starcheck.sk',
                    },
                    dialogs: {
                        using_cookies_title: "Táto stránka používa cookies",
                        using_cookies_text: "Používame súbory cookies na zlepšenie používateľskej skúsenosti. Vyberte, aké súbory cookies nám dovoľujete používať.",
                        about_cookies_text: "Cookie je v kontexte počítačov a internetu malý kúsok údajov, ktorý webová stránka posiela vášmu prehliadaču a je uložený na vašom počítači alebo inom zariadení. Súbory cookies sa používajú na zapamätanie si informácií o vás, ako sú vaše preferencie alebo prihlasovacie údaje, čo môže zlepšiť vašu prehliadaciu skúsenosť alebo optimalizovať niektoré funkcie webových stránok.",
                        cookie_necessary_explanation: "Nevyhnutné cookies, tiež známe ako základné cookies, sú súbory cookies, ktoré sú nevyhnutné pre správne fungovanie webovej stránky a poskytovanie základných funkcií. Tieto súbory cookies nevyžadujú súhlas používateľa, pretože sú nevyhnutné pre prevádzku webovej stránky a nezhromažďujú žiadne osobné údaje okrem toho, čo je nevyhnutné.",
                        cookie_preferences_explanation: "Preferenčné súbory cookies, tiež známe ako funkčné cookies, sa používajú na zapamätanie si používateľských preferencií a výberov s cieľom poskytnúť personalizovanú prehliadaciu skúsenosť. Na rozdiel od nevyhnutných cookies, ktoré sú nevyhnutné pre základnú funkčnosť webovej stránky, súbory cookies preferencií nie sú prísne nevyhnutné, ale používajú sa na zlepšenie používateľskej skúsenosti.",
                        cookie_statistics_explanation: "Štatistické súbory cookies, tiež známe ako analytické súbory cookies, sa používajú na zbieranie informácií o tom, ako návštevníci interagujú s webovou stránkou. Tieto súbory cookies zbierajú údaje, ako je počet návštevníkov webovej stránky, stránky, ktoré navštívili, dĺžka ich návštevy a zdroje, odkiaľ prišli. Zozbierané informácie sú zvyčajne agregované a anonymizované, čo znamená, že jednotliví používatelia nemôžu byť identifikovaní.",
                        cookie_marketing_explanation: "Cielené súbory cookies, tiež nazývané reklamné súbory cookies, sú súbory cookies, ktoré sledujú používateľov na rôznych webových stránkach za účelom vytvorenia profilu ich záujmov a preferencií. Tieto súbory cookies sú používané reklamistami a marketérmi na zasielanie cielených reklám používateľom na základe ich prehliadacej histórie a správania.",
                        cookie_unclasified_explanation: "Neklasifikované súbory cookies obvykle odkazujú na súbory cookies, ktoré nespadajú do preddefinovaných kategórií, ako sú nevyhnutné, preferencie, štatistiky alebo marketingové súbory cookies. Tieto súbory cookies môžu mať rôzne účely alebo funkcie v závislosti na tom, ako sú používané webovou stránkou."
                    },
                    languages: {
                        sk: 'Slovenčina',
                        gb: 'Angličtina',
                    },
                }
            }
        }
    });