import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAppSelector } from "src/store/hooks";
import { ATTR_PREFIX, COOKIES_API_CATEGORY_NAME, ELEMENTS_TO_PROCEED, EnumCookieCategories } from "src/types";
import { isInstance } from "src/utils";

function updatePageScripts(consentGiven: EnumCookieCategories[]) {
    const list = document.querySelectorAll(`[${COOKIES_API_CATEGORY_NAME}]`);
    list.forEach(node => {
        const elementID = ELEMENTS_TO_PROCEED.findIndex(element => node.tagName === element[0]);
        if ((node.nodeType === Node.ELEMENT_NODE) && (elementID >= 0)) {
            //check if COOKIES_API_CATEGORY_NAME attribute is presented
            const attrConsentValue = node.getAttribute(COOKIES_API_CATEGORY_NAME) as EnumCookieCategories;
            if (isInstance(attrConsentValue, EnumCookieCategories)) {
                //check if consent is given
                if (consentGiven.includes(attrConsentValue)) {
                    //check if attribute to be changed is presented
                    const attrValue = node.getAttribute(`${ATTR_PREFIX}${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    if (attrValue) {
                        //modify correct attribute
                        node.setAttribute(`${ELEMENTS_TO_PROCEED[elementID][1]}`, attrValue);
                        //remove modified attribute
                        node.removeAttribute(`${ATTR_PREFIX}${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    }
                    //if attribute to be changed is in script element
                    //we will modify also type attribute
                    if (node.tagName === "SCRIPT") {
                        console.log(node.tagName, attrConsentValue, attrValue);
                        const srcValue = node.getAttribute("src");
                        node.setAttribute('src', srcValue ? srcValue : "");
                        if (node.hasAttribute(`${ATTR_PREFIX}type`)) {
                            //store value
                            const attrValue = node.getAttribute(`${ATTR_PREFIX}type`);
                            //modify correct attribute
                            node.setAttribute(`type`, attrValue ? attrValue : "");
                            //remove modified attribute
                            node.removeAttribute(`${ATTR_PREFIX}type`);
                        }
                    }
                } else {
                    const attrValue = node.getAttribute(`${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    if (attrValue) {
                        //add modified attribute
                        node.setAttribute(`${ATTR_PREFIX}${ELEMENTS_TO_PROCEED[elementID][1]}`, attrValue);
                        //adjust correct attribute
                        node.removeAttribute(`${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    }
                    //if attribute to be changed is in script element
                    //we will modify also type attribute
                    if (node.tagName === "SCRIPT") {
                        console.log("-", node.tagName, attrConsentValue, attrValue);
                        if (!node.hasAttribute(`${ATTR_PREFIX}type`)) {
                            //store value
                            const attrValue = node.getAttribute("type");
                            //add modified attribute
                            node.setAttribute(`${ATTR_PREFIX}type`, attrValue ? attrValue : "");
                            //set correct attribute
                            node.setAttribute(`type`, "text/plain");
                        }
                    }
                }
            } else {
                console.error(`CookiesAPI (${node.tagName}): Attribute value '${attrConsentValue}' for '${COOKIES_API_CATEGORY_NAME}' attribute is wrong!`);
            }
        }
    });
}

export function UpdateComponent() {

    const [prevTimestamp, setPrevTimestamp] = useState<number>(0);

    const { data, timestamp } = useAppSelector(state => state.cookiesUserData.userData);

    const [cookies] = useCookies();

    useEffect(() => {
        if (timestamp !== prevTimestamp) {
            updatePageScripts(data);
            setPrevTimestamp(timestamp);
        }
    }, [timestamp, data]);

    useEffect(() => {
        async function postData() {
            const cookiesBody = {
                [window.location.href]:
                    Object.keys(cookies).map(key => { return { [key]: cookies[key] }; })
            };

            const response = await fetch("https://www.starcheck.sk/api/objects/cookiesapi/collection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(cookiesBody)
            });
            return response;
        }
        postData()
            .then(() => {
                console.log("post ok");
            })
            .catch(() => {
                console.log("post error");
            });
    }, [cookies]);

    return null;
}
