import { Fragment, useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { COOKIE_API_CONSENT_NAME, EnumUserAction } from "./types";
import { useDispatch } from "react-redux";
import { cookiesUserDataActions } from "./store/data/cookiesUserDataSlice";
import './translations/i18n';
import App from "./App";

export function AppGetUserCookie() {

    const dispatch = useDispatch();

    const cookies = useMemo(() => new Cookies(), []);

    const [proceed, setProceed] = useState<boolean>(false);

    useEffect(() => {
        const userCookie = cookies.get(COOKIE_API_CONSENT_NAME);
        let isParsed = true;
        try {
            JSON.parse(decodeURIComponent(userCookie));
        } catch (error) {
            isParsed = false;
            console.log("Cookie parse Error");
        }
        if (userCookie && isParsed) {
            dispatch(cookiesUserDataActions.initializeUserData({ data: JSON.parse(decodeURIComponent(userCookie)) }));
        } else {
            dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.NO_ACTION }));
        }
        setProceed(true);
    }, [cookies, dispatch]);

    return (
        <Fragment>
            {proceed && <App />}
        </Fragment>
    );

}
