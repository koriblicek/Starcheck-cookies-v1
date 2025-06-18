const COOKIES_API_CATEGORY_NAME = "data-ca-category";
const ATTR_PREFIX = "data-ca-";
//define all elements to be proceeeed
const elementsToProceed = [["SCRIPT", "src"], ["IFRAME", "src"], ["IMG", "src"], ["LINK", "href"]];

//const all categories
const consentCategories = ["necessary", "preferences", "statistics", "marketing", "unclasified", "unknown"];

//load cookies
const cookies = document.cookie.split(";");
const consentCookies = cookies.filter(cookie => cookie.trim().split("=")[0] === "CookiesApiConsent");
// kategorizácia podľa URL/domény
const CATEGORY_BY_URL = [
    { match: "cdn.jsdelivr.net", categories: ["necessary"] },
    { match: "cdnjs.cloudflare.com", categories: ["necessary"] },
    { match: "fonts.googleapis.com", categories: ["necessary"] },
    { match: "fonts.gstatic.com", categories: ["necessary"] },
    { match: "polyfill.io", categories: ["necessary"] },
    { match: "www.google.com/recaptcha", categories: ["necessary"] },
    { match: "hcaptcha.com", categories: ["necessary"] },
    { match: "cdn.cookielaw.org", categories: ["preferences"] },
    { match: "app.cookieinformation.com", categories: ["preferences"] },
    { match: "my.clarity.ms", categories: ["preferences"] },
    { match: "cdn.siftscience.com", categories: ["preferences"] },
    { match: "www.zopim.com", categories: ["preferences"] },
    { match: "widget.intercom.io", categories: ["preferences"] },
    { match: "static.zdassets.com", categories: ["preferences"] },
    { match: "livechatinc.com", categories: ["preferences"] },
    { match: "www.google-analytics.com", categories: ["statistics"] },
    { match: "ssl.google-analytics.com", categories: ["statistics"] },
    { match: "googletagmanager.com", categories: ["statistics"] },
    { match: "stats.g.doubleclick.net", categories: ["statistics"] },
    { match: "plausible.io", categories: ["statistics"] },
    { match: "cdn.matomo.cloud", categories: ["statistics"] },
    { match: "js.hs-analytics.net", categories: ["statistics"] },
    { match: "cdn.simpleanalytics.io", categories: ["statistics"] },
    { match: "script.hotjar.com", categories: ["statistics"] },
    { match: "static.hotjar.com", categories: ["statistics"] },
    { match: "matomo.example.com", categories: ["statistics"] },
    { match: "cdn.segment.com", categories: ["statistics"] },
    { match: "api.segment.io", categories: ["statistics"] },
    { match: "js.driftt.com", categories: ["statistics"] },
    { match: "script.albacross.com", categories: ["statistics"] },
    { match: "cdn.mouseflow.com", categories: ["statistics"] },
    { match: "rum-static.pingdom.net", categories: ["statistics"] },
    { match: "connect.facebook.net", categories: ["marketing"] },
    { match: "googleads.g.doubleclick.net", categories: ["marketing"] },
    { match: "pagead2.googlesyndication.com", categories: ["marketing"] },
    { match: "www.googletagservices.com", categories: ["marketing"] },
    { match: "ads.twitter.com", categories: ["marketing"] },
    { match: "analytics.twitter.com", categories: ["marketing"] },
    { match: "platform.twitter.com", categories: ["marketing"] },
    { match: "tiktok.com", categories: ["marketing"] },
    { match: "www.tiktok.com", categories: ["marketing"] },
    { match: "px.ads.linkedin.com", categories: ["marketing"] },
    { match: "snap.licdn.com", categories: ["marketing"] },
    { match: "bat.bing.com", categories: ["marketing"] },
    { match: "ad.doubleclick.net", categories: ["marketing"] },
    { match: "youtube.com", categories: ["marketing"] },
    { match: "www.youtube.com", categories: ["marketing"] },
    { match: "cdn.taboola.com", categories: ["marketing"] },
    { match: "cdn.outbrain.com", categories: ["marketing"] },
    { match: "ct.pinterest.com", categories: ["marketing"] },
    { match: "log.pinterest.com", categories: ["marketing"] },
    { match: "trk.pinterest.com", categories: ["marketing"] },
    { match: "tr.snapchat.com", categories: ["marketing"] },
    { match: "analytics.tiktok.com", categories: ["marketing"] },
    { match: "static.adsafeprotected.com", categories: ["marketing"] },
    { match: "tag.aticdn.net", categories: ["marketing"] },
    { match: "track.adform.net", categories: ["marketing"] },
    { match: "media.net", categories: ["marketing"] },
    { match: "a.impactradius-go.com", categories: ["marketing"] },
    { match: "cdn.heapanalytics.com", categories: ["marketing"] },
    { match: "clarity.ms", categories: ["statistics"] },
    { match: "smedata.sk", categories: ["statistics"] },
    { match: "ads.caroda.io", categories: ["marketing"] },
    { match: "hit.gemius.pl", categories: ["marketing"] },
    { match: "publisher.caroda.io", categories: ["marketing"] },
    { match: "ajax.googleapis.com", categories: ["necessary"] }, // jQuery CDN
    { match: "ls.hit.gemius.pl", categories: ["marketing"] },
    { match: "starcheck.sk", categories: ["preferences"] }
];


// function check(targetarr, arr) {
//     return targetarr.map((e) => {
//         return (arr.includes(e.trim())) ? true : false;
//     }).every((e) => e === true);
// }

//checks if all items from 1st array are presented in the 2nd array
function check(targetarr, arr) {
    return targetarr.every((e) => arr.includes(e.trim()));
}

let consentGiven = ["necessary"];
//if there is cookie presented (previously saved) - try to load consent
if (consentCookies.length === 1) {
    //parse cookie
    let cookieIsParsed = true;
    // over, že userConsentCookie je reťazec v platnom JSON formáte a že je URIComponent-encoded. Inak hrozí, že zle formátovaný cookie spôsobí výnimku alebo XSS.
    const userConsentCookie = consentCookies[0].split("=")[1];
    try {
        JSON.parse(decodeURIComponent(userConsentCookie));
    } catch (error) {
        cookieIsParsed = false;
    }
    //if parsed ok
    if (cookieIsParsed) {
        const data = JSON.parse(decodeURIComponent(userConsentCookie)).data;
        //check if data key is presented
        if (data && Array.isArray(data)) {
            //go through all data items and create consentGiven array (remove incorrect items)
            const tempConsentGiven = data.filter(item => consentCategories.includes(item));
            //if no consent given - probably by mistake - reset it
            consentGiven = tempConsentGiven.length !== 0 ? tempConsentGiven : consentGiven;
        }
    }
}

//links to report - not found in our database
const linksToReport = [];

const domObserver = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            //if not node element
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            //get element tag name
            const tagName = node.tagName;
            //check if correct element to proceed (from the list of given elements)
            const elementConfig = elementsToProceed.find(([tag]) => tag === tagName);
            if (!elementConfig) return;
            //get attribute name
            const [_, attrName] = elementConfig;

            // Ak element nemá priradenú kategóriu, skús fallback podľa URL
            if (!node.hasAttribute(COOKIES_API_CATEGORY_NAME)) {
                const attrValue = node.getAttribute(attrName);
                if (attrValue) {
                    //check if url is already in the list
                    const matchEntry = CATEGORY_BY_URL.find(entry => attrValue.includes(entry.match));
                    if (matchEntry?.categories?.length) {
                        node.setAttribute(COOKIES_API_CATEGORY_NAME, matchEntry.categories.join(","));
                    } else {
                        node.setAttribute(COOKIES_API_CATEGORY_NAME, "unknown");
                        linksToReport.push(attrValue); // na reportovanie nenájdených fallbackov
                    }
                }
            }

            // Znovu over, či element už má kategóriu
            if (!node.hasAttribute(COOKIES_API_CATEGORY_NAME)) return;
            //if unknown return
            if (node.getAttribute(COOKIES_API_CATEGORY_NAME) === "unknown") return;

            //read all categories from element
            const allCategories = node.getAttribute(COOKIES_API_CATEGORY_NAME).split(",");
            const filteredCategories = allCategories.filter(category => {
                const valid = consentCategories.includes(category.trim());
                // Ak chceš logovať chyby:
                if (!valid) console.error(`(CookiesAPI-Observer): Not valid category: '${category.trim()}'`);
                return valid;
            });

            // Ak žiadna z kategórií nemá súhlas, odstráň aktívne atribúty
            if (!check(filteredCategories, consentGiven)) {
                const currentAttrValue = node.getAttribute(attrName);
                if (currentAttrValue) {
                    node.setAttribute(`${ATTR_PREFIX}${attrName}`, currentAttrValue);
                    node.removeAttribute(attrName);
                }

                if (tagName === "SCRIPT") {
                    const typeAttr = node.getAttribute("type") || "";
                    node.setAttribute(`${ATTR_PREFIX}type`, typeAttr);
                    node.setAttribute("type", "text/plain");
                }
            }
        });
    });
});

// Starts the monitoring
domObserver.observe(document.documentElement, { childList: true, subtree: true });

//create script element
const cookiesApiDiv = document.createElement("div");
cookiesApiDiv.setAttribute("id", "APICOOKIES-root");
const data = ["data-id", "data-color", "data-lng"];
data.forEach((id) => {
    const value = document.currentScript.getAttribute(id);
    if (id) {
        cookiesApiDiv.setAttribute(id, value);
    }
});

const cookiesApiScript = document.createElement("script");
cookiesApiScript.setAttribute("type", "module");
//online version
cookiesApiScript.setAttribute("src", `https://www.starcheck.sk/apijs/${document.currentScript.getAttribute('data-id')}/APICOOKIES/${document.currentScript.getAttribute('data-version')}/visual`);
//local version for testing
//cookiesApiScript.setAttribute("src", `/dist/cookies_api_v1.js`);

function addConsentApi(cookiesApiDiv, cookiesApiScript) {
    document.body.append(cookiesApiDiv);
    document.body.append(cookiesApiScript);
    window.removeEventListener("DOMContentLoaded", addConsentApi);
}

//if content loaded - insert consent api div and script
window.addEventListener("DOMContentLoaded", (event) => {
    //add comment during testing local version
    addConsentApi(cookiesApiDiv, cookiesApiScript);
    //console.log(linksToReport);
});

console.log("COOKIEAPI-Observer is running:", consentGiven);
