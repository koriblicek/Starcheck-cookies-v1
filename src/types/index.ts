import { ReactNode } from "react";

export const BUTTON_ICON_SIZE = 0.7;
export const COOKIE_API_CONSENT_NAME = "CookiesApiConsent";
export const COOKIE_EXPIRES = 86400 * 1000 * 31;
export const STARCHECK_LINK = "https://www.starcheck.sk";
export const COOKIES_API_CATEGORY_NAME = "data-apicookiescategory";

export type PropsWithChildren<P = unknown> = P & { children: ReactNode; };

export enum EnumCookieCategories {
    NECESSARY = 'necessary',
    PREFERENCES = 'preferences',
    STATISTICS = 'statistics',
    MARKETING = 'marketing',
    UNCLASIFIED = 'unclasified'
}
export enum EnumUserAction {
    NO_ACTION = 'no-action',
    ACCEPTED_ALL = 'accepted_all',
    ACCEPTED_SELECTED = 'accepted_selected',
    REJECTED = 'rejected'
}

export interface ICookiesUserSettings {
    action: EnumUserAction;
    timestamp: number;
    data: EnumCookieCategories[];
}

export const defaultCookiesUserSettings: ICookiesUserSettings = {
    action: EnumUserAction.NO_ACTION,
    timestamp: Date.now(),
    data: [EnumCookieCategories.NECESSARY]
};
