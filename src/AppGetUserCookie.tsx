import { Fragment, useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { COOKIE_API_CONSENT_NAME, EnumUserAction } from "./types";
import { useDispatch } from "react-redux";
import { cookiesUserDataActions } from "./store/data/cookiesUserDataSlice";
import App from "./App";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";

interface IAppGetUserCookieProps {
    lng: string;
    color: string;
}
export function AppGetUserCookie({ lng, color }: IAppGetUserCookieProps) {

    const dispatch = useDispatch();

    const cookies = useMemo(() => new Cookies(), []);

    const [proceed, setProceed] = useState<boolean>(false);

    const { i18n } = useTranslation();

    useEffect(() => {
        const userCookie = cookies.get(COOKIE_API_CONSENT_NAME);
        if (userCookie) {
            dispatch(cookiesUserDataActions.initializeUserData({ data: userCookie }));
        } else {
            dispatch(cookiesUserDataActions.saveUserCookies({ action: EnumUserAction.NO_ACTION }));
        }
        setProceed(true);
        i18n.changeLanguage(lng);
    }, [cookies, dispatch, lng, i18n]);

    return (
        <Fragment>
            <ThemeProvider theme={new CustomTheme(color).getTheme()}>
                {proceed && <App />}
            </ThemeProvider>
        </Fragment>
    );

}
