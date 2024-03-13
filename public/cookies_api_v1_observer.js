const COOKIES_API_CATEGORY_NAME = "data-ca-category";
const ATTR_PREFIX = "data-ca-";
//define all elements to be proceeeed
const elementsToProceed = [["SCRIPT", "src"], ["IFRAME", "src"], ["IMG", "src"], ["LINK", "href"]];
//const all categories
const consentCategories = ["necessary", "preferences", "statistics", "marketing", "unclasified"];
//load cookies
const cookies = document.cookie.split(";");
const consentCookies = cookies.filter(cookie => cookie.trim().split("=")[0] === "CookiesApiConsent");

//checks if all items from 1st array are presented in the 2nd array
function check(targetarr, arr) {
    return targetarr.map((e) => {
        return (arr.includes(e.trim())) ? true : false;
    }).every((e) => e === true);
}

let consentGiven = ["necessary"];
//if there is cookie presented - try to load consent
if (consentCookies.length === 1) {
    //parse cookie
    let cookieIsParsed = true;
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
            //go through all data items and create consentGiven array
            const tempConsentGiven = data.filter(item => consentCategories.includes(item));
            //if no consent given - probably by mistake - reset it
            consentGiven = tempConsentGiven.length !== 0 ? tempConsentGiven : consentGiven;
        }
    }
}

const domObserver = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            // detect elemnt to proceed (in the list of elementsToProceed)
            const elementID = elementsToProceed.findIndex(element => node.tagName === element[0]);
            if ((node.nodeType === Node.ELEMENT_NODE) && (elementID >= 0)) {
                //check if COOKIES_API_CATEGORY_NAME attribute is presented
                if (node.hasAttribute(COOKIES_API_CATEGORY_NAME)) {
                    //read all categories
                    const allCategories = node.getAttribute(COOKIES_API_CATEGORY_NAME).split(",");
                    //check if all given categories are correctly typed
                    const filteredCategories = allCategories.filter((category) => {
                        if (consentCategories.includes(category.trim())) {
                            return true;
                        } else {
                            console.error(`CookiesAPI-Observer (${node.tagName}): Attribute value '${category.trim()}' for '${COOKIES_API_CATEGORY_NAME}' attribute is wrong!`);
                            return false;
                        }
                    });
                    //check if consent is not given
                    // if (!consentGiven.includes(category.trim())) {
                    //check all categories (one script can be in several categories)
                    if (!check(filteredCategories, consentGiven)) {
                        //check if attribute to be changed is presented
                        if (node.hasAttribute(elementsToProceed[elementID][1])) {
                            //set new attribute 'data-' preffix
                            const attrValue = node.getAttribute(elementsToProceed[elementID][1]);
                            node.setAttribute(`${ATTR_PREFIX}${elementsToProceed[elementID][1]}`, attrValue);
                            //delete old attribute
                            node.removeAttribute(elementsToProceed[elementID][1]);
                        }
                        //if attribute to be changed is in script element
                        //we will modify also type attribute
                        if (node.tagName === "SCRIPT") {
                            //set modified attribute 
                            const attrValue = node.getAttribute("type");
                            node.setAttribute(`${ATTR_PREFIX}type`, attrValue ? attrValue : "");
                            //set correct attribute
                            node.setAttribute(`type`, "text/plain");
                        }
                    }
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
cookiesApiScript.setAttribute("src", `https://www.starcheck.sk/apijs/${document.currentScript.getAttribute('data-id')}/APICOOKIES/${document.currentScript.getAttribute('data-version')}/visual`);
//local testing
//cookiesApiScript.setAttribute("src", `/dist/cookies_api_v1.js`);

function addConsentApi(cookiesApiDiv, cookiesApiScript) {
    document.body.append(cookiesApiDiv);
    document.body.append(cookiesApiScript);
    window.removeEventListener("DOMContentLoaded", addConsentApi);
}

window.addEventListener("DOMContentLoaded", (event) => addConsentApi(cookiesApiDiv, cookiesApiScript));
console.log("COOKIEAPI-Observer is running:", consentGiven);
