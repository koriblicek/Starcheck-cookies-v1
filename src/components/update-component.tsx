
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAppSelector } from "src/store/hooks";
import { COOKIES_API_CATEGORY_NAME, EnumCookieCategories } from "src/types";
import { isInstance } from "src/utils";


function updatePageScripts(allowed: EnumCookieCategories[]) {
    const list = document.querySelectorAll(`[${COOKIES_API_CATEGORY_NAME}]`);
    list.forEach(item => {
        //check if script is allowed
        if (item.hasAttribute(COOKIES_API_CATEGORY_NAME)) {
            const category = item.getAttribute(COOKIES_API_CATEGORY_NAME);
            if (isInstance(category, EnumCookieCategories) as boolean) {
                if (allowed.includes(category as EnumCookieCategories)) {
                    //allow                    
                    const dataSrc = item.getAttribute("data-src");
                    if (dataSrc) {
                        item.setAttribute("src", dataSrc);
                        item.removeAttribute("data-src");
                    }
                } else {
                    const src = item.getAttribute("src");
                    if (src) {
                        item.setAttribute("data-src", src);
                        item.removeAttribute("src");
                    }
                }
            } else {
                console.error(`CookiesAPI (${item.tagName}): '${category}' unknown!`);
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
            const response = await fetch("https://www.starcheck.sk/testapi/post/cookiesapi/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        url: window.location.href,
                        cookies:
                            Object.keys(cookies).map(key => {
                                return {
                                    "key": key,
                                    "value": cookies[key]
                                };
                            })
                    })
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
