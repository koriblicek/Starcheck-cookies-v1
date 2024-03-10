import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { COOKIE_API_CONSENT_NAME, EnumUserAction } from "./types";
import { useDispatch } from "react-redux";
import { cookiesUserDataActions } from "./store/data/cookiesUserDataSlice";
import './translations/i18n';
import App from "./App";

export function AppGetUserCookie() {

    const dispatch = useDispatch();

    const [cookies, setCookies] = useCookies();

    const [proceed, setProceed] = useState<boolean>(false);

    useEffect(() => {
        const userCookie = cookies[COOKIE_API_CONSENT_NAME];
        if (userCookie) {
            dispatch(cookiesUserDataActions.initializeUserData({ data: JSON.parse(decodeURIComponent(userCookie)) }));
        } else {
            dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.NO_ACTION }));
        }
        setProceed(true);
    }, [cookies, dispatch, setCookies]);

    return (
        <Fragment>
            {proceed && <App />}
        </Fragment>
    );

}
