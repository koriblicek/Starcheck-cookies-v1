import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';
import { COOKIE_API_CONSENT_NAME, COOKIE_EXPIRES, EnumCookieCategories, EnumUserAction, ICookiesUserSettings, defaultCookiesUserSettings } from 'src/types';
import { isInstance } from 'src/utils';

interface State {
    userData: ICookiesUserSettings;
}

const initialState = {
    userData: defaultCookiesUserSettings
} as State;

export const cookiesUserDataSlice = createSlice({
    name: 'cookiesUserData',
    initialState,
    reducers: {
        initializeUserData: (state, action: PayloadAction<{ data: ICookiesUserSettings; }>) => {
            //verify action
            const dataAction = action.payload.data.action;
            //if wrong data set as no action
            const verifiedAction = isInstance(dataAction, EnumUserAction) as boolean ? dataAction : EnumUserAction.NO_ACTION;
            //verify categories - keep only correct ones
            const verifiedData = action.payload.data.data.filter((item) => isInstance(item, EnumCookieCategories));
            //add necessary category if not presented
            if (!verifiedData.includes(EnumCookieCategories.NECESSARY)) {
                verifiedData.push(EnumCookieCategories.NECESSARY);
            }
            //initialize user data
            state.userData = { action: verifiedAction, data: verifiedData };
        },
        toggleCategory: (state, action: PayloadAction<{ category: EnumCookieCategories; }>) => {
            if (state.userData.data.includes(action.payload.category)) {
                state.userData.data = [...state.userData.data.filter(item => item !== action.payload.category)];
            } else {
                state.userData.data = [...state.userData.data, action.payload.category];
            }
        },
        saveUserCookies: (state, action: PayloadAction<{ action: EnumUserAction; }>) => {
            const cookies = new Cookies();
            switch (action.payload.action) {
                case EnumUserAction.REJECTED: {
                    const rejected = { action: action.payload.action, data: [EnumCookieCategories.NECESSARY] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, encodeURIComponent(JSON.stringify(rejected)), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = rejected;
                    break;
                }
                case EnumUserAction.ACCEPTED_SELECTED: {
                    const selected = { action: action.payload.action, data: [...state.userData.data] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, encodeURIComponent(JSON.stringify(selected)), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = selected;
                    break;
                }
                case EnumUserAction.ACCEPTED_ALL: {
                    const all = { action: action.payload.action, data: [...Object.values(EnumCookieCategories).map(value => value)] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, encodeURIComponent(JSON.stringify(all)), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = all;
                    break;
                }
                case EnumUserAction.NO_ACTION: {
                    cookies.set(COOKIE_API_CONSENT_NAME, encodeURIComponent(JSON.stringify(defaultCookiesUserSettings)), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                }
            }
        }
    }
});

// Action creators are generated for each case reducer function
export const cookiesUserDataActions = cookiesUserDataSlice.actions;
export const cookiesUserDataReducer = cookiesUserDataSlice.reducer;