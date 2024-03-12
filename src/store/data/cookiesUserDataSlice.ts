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
            let saveIsNeeded = false;
            //verify action
            let verifiedAction = action.payload.data.action;
            if (!verifiedAction || !isInstance(verifiedAction, EnumUserAction) as boolean) {
                verifiedAction = EnumUserAction.NO_ACTION
                saveIsNeeded = true;
            }
            //verify categories - keep only correct ones
            let verifiedData: EnumCookieCategories[] = [];
            //if data exists and they are array - push categories into verified data variable
            if (action.payload.data.data && Array.isArray(action.payload.data.data)) {
                verifiedData = action.payload.data.data.filter((item) => isInstance(item, EnumCookieCategories));
            } else {
                verifiedAction = EnumUserAction.NO_ACTION;
                saveIsNeeded = true;
            }
            //add necessary category if not presented
            if (!verifiedData.includes(EnumCookieCategories.NECESSARY)) {
                verifiedData.push(EnumCookieCategories.NECESSARY);
                verifiedAction = EnumUserAction.NO_ACTION;
                saveIsNeeded = true;
            }
            //verify timestamp
            let verifiedTimestamp = Number(action.payload.data.timestamp);
            if (!verifiedTimestamp || verifiedTimestamp < 0 || verifiedTimestamp > Date.now()) {
                console.log(verifiedTimestamp);
               
                verifiedTimestamp = Date.now();
                verifiedAction = EnumUserAction.NO_ACTION;
                saveIsNeeded = true;
            }
            //initialize user data
            const verifiedState = { action: verifiedAction, timestamp: verifiedTimestamp, data: verifiedData };
            state.userData = verifiedState;
            if (saveIsNeeded) {
                const cookies = new Cookies();
                cookies.set(COOKIE_API_CONSENT_NAME, JSON.stringify(verifiedState), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
            }
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
                    const rejected = { action: action.payload.action, timestamp: Date.now(), data: [EnumCookieCategories.NECESSARY] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, JSON.stringify(rejected), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = rejected;
                    break;
                }
                case EnumUserAction.ACCEPTED_SELECTED: {
                    const selected = { action: action.payload.action, timestamp: Date.now(), data: [...state.userData.data] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, JSON.stringify(selected), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = selected;
                    break;
                }
                case EnumUserAction.ACCEPTED_ALL: {
                    const all = { action: action.payload.action, timestamp: Date.now(), data: [...Object.values(EnumCookieCategories).map(value => value)] } as ICookiesUserSettings;
                    cookies.set(COOKIE_API_CONSENT_NAME, JSON.stringify(all), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    state.userData = all;
                    break;
                }
                case EnumUserAction.NO_ACTION: {
                    cookies.set(COOKIE_API_CONSENT_NAME, JSON.stringify(defaultCookiesUserSettings), { expires: new Date(Date.now() + COOKIE_EXPIRES) });
                    break;
                }
            }
        }
    }
});

// Action creators are generated for each case reducer function
export const cookiesUserDataActions = cookiesUserDataSlice.actions;
export const cookiesUserDataReducer = cookiesUserDataSlice.reducer;