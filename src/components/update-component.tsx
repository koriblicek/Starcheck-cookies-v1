import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import { useAppSelector } from "src/store/hooks";
import { ATTR_PREFIX, COOKIES_API_CATEGORY_NAME, ELEMENTS_TO_PROCEED, EnumCookieCategories } from "src/types";
import { isInstance } from "src/utils";

//checks if all items from 1st array are presented in the 2nd array
function check(targetarr: string[], arr: string[]) {
    return targetarr.every((e) => arr.includes(e.trim()));
}

function updatePageScripts(consentGiven: EnumCookieCategories[]): string[] {

    const returnList: string[] = [];

    const list = document.querySelectorAll(`[${COOKIES_API_CATEGORY_NAME}]`);

    list.forEach(node => {
        const elementID = ELEMENTS_TO_PROCEED.findIndex(element => node.tagName === element[0]);
        if ((node.nodeType === Node.ELEMENT_NODE) && (elementID >= 0)) {

            //check if COOKIES_API_CATEGORY_NAME attribute is presented
            //const attrConsentValue = node.getAttribute(COOKIES_API_CATEGORY_NAME) as EnumCookieCategories;
            //if (isInstance(attrConsentValue, EnumCookieCategories)) {
            //check if consent is given
            //read all categories
            const attrConsentValue = node.getAttribute(COOKIES_API_CATEGORY_NAME);
            if (attrConsentValue) {
                //get all categories
                const allCategories = attrConsentValue.split(",");
                //check if all given categories are correctly typed
                const filteredCategories = allCategories.filter((category) => {
                    if (isInstance(category.trim(), EnumCookieCategories)) {
                        return true;
                    } else {
                        if (category.trim() === "unknown") {
                            const link = node.getAttribute(ELEMENTS_TO_PROCEED[elementID][1]);
                            if (link) {
                                returnList.push(link);
                            }
                        } else {
                            console.error(`CookiesAPI-Observer (${node.tagName}): Attribute value '${category.trim()}' for '${COOKIES_API_CATEGORY_NAME}' attribute is wrong!`);
                        }
                        return false;
                    }
                });

                if (check(filteredCategories, consentGiven)) {
                    //if (consentGiven.includes(attrConsentValue)) {
                    //check if attribute to be changed is presented
                    const attrValue = node.getAttribute(`${ATTR_PREFIX}${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    if (attrValue) {
                        console.log(attrValue);
                        //modify correct attribute
                        node.setAttribute(`${ELEMENTS_TO_PROCEED[elementID][1]}`, attrValue);
                        //remove modified attribute
                        node.removeAttribute(`${ATTR_PREFIX}${ELEMENTS_TO_PROCEED[elementID][1]}`);
                    }
                    //if attribute to be changed is in script element
                    //we will modify also type attribute
                    if (node.tagName === "SCRIPT") {
                        // const srcValue = node.getAttribute("src");
                        // node.setAttribute('src', srcValue ? srcValue : "");
                        const typeAttrValue = node.getAttribute(`${ATTR_PREFIX}type`);
                        if (typeAttrValue) {
                            //store value
                            const attrValue = node.getAttribute(`${ATTR_PREFIX}type`);
                            //modify correct attribute
                            node.setAttribute(`type`, attrValue ? attrValue : "");
                            //remove modified attribute
                            node.removeAttribute(`${ATTR_PREFIX}type`);
                        } else {
                            //if script had no data-type attribute before - we will add it to be able to run script
                            node.setAttribute(`type`, "text/javascript");
                        }
                        //clone node
                        const newNode = node.cloneNode(true);
                        node.replaceWith(newNode);
                        //node.remove();
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

            }
            else {
                returnList.push(node.getAttribute(ELEMENTS_TO_PROCEED[elementID][1]) as string);
                //missing COOKIES_API_CATEGORY_NAME attribute

            }
            //} else {
            //    console.error(`CookiesAPI-Visual (${node.tagName}): Attribute value '${attrConsentValue}' for '${COOKIES_API_CATEGORY_NAME}' attribute is wrong!`);
            //}
        }
    });
    console.log(returnList);
    return returnList;

}

export function UpdateComponent() {

    const [prevTimestamp, setPrevTimestamp] = useState<number>(0);

    const [listOfLink, setListOfLinks] = useState<string[]>([]);

    const { data, timestamp } = useAppSelector(state => state.cookiesUserData.userData);

    //const [cookies] = useCookies();

    useEffect(() => {
        if (timestamp !== prevTimestamp) {
            setListOfLinks(updatePageScripts(data));
            setPrevTimestamp(timestamp);
        }
    }, [timestamp, data]);

    useEffect(() => {
        async function postData() {
            // const cookiesBody = {
            //     [window.location.href]:
            //         Object.keys(cookies).map(key => { return { [key]: cookies[key] }; })
            // };

            const response = await fetch("https://www.starcheck.sk/api/objects/cookiesapi/collection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(listOfLink)
            });
            return response;
        }
        if (listOfLink.length > 0) {
            postData()
                .then(() => {
                    //console.log("post ok");
                })
                .catch(() => {
                    console.error("post error");
                });
        }
    }, [listOfLink]);

    return null;
}
