import { ReactNode } from "react";

export const BUTTON_ICON_SIZE = 0.7;
export const COOKIE_API_CONSENT_NAME = "CookiesApiConsent";
export const COOKIE_EXPIRES = 86400 * 1000 * 31;
export const STARCHECK_LINK = "https://www.starcheck.sk";

export type PropsWithChildren<P = unknown> = P & { children: ReactNode; };

export enum EnumCookieCategories {
    NECESSARY = 'necessary',
    PREFERENCES = 'preferences',
    STATISTICS = 'statistics',
    MARKETING = 'marketing'
}
export enum EnumUserAction {
    NO_ACTION = 'no-action',
    ACCEPTED_ALL = 'accepted_all',
    ACCEPTED_SELECTED = 'accepted_selected',
    REJECTED = 'rejected'
}

export interface ICookiesUserSettings {
    action: EnumUserAction;
    data: EnumCookieCategories[];
}

export const defaultCookiesUserSettings: ICookiesUserSettings = {
    action: EnumUserAction.NO_ACTION,
    data: [EnumCookieCategories.NECESSARY]
};

export interface IApiData {
    cookies: ICookiesData;
}

export interface ICookiesData {
    necessary: [];
    performance: [];
    statistics: [];
    marketing: [];
    unclasified: [];
}

export const defaultCookiesData: ICookiesData = {
    necessary: [],
    performance: [],
    statistics: [],
    marketing: [],
    unclasified: []
};