import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICookiesData, defaultCookiesData } from 'src/types';

interface State {
    data: ICookiesData;
}

const initialState = {
    data: defaultCookiesData
} as State;

export const cookiesDataSlice = createSlice({
    name: 'cookiesData',
    initialState,
    reducers: {
        initializerData: (state, action: PayloadAction<{ data: ICookiesData; }>) => {
            //initialize  data
            state.data = action.payload.data;
        }
    }
});

// Action creators are generated for each case reducer function
export const cookiesDataActions = cookiesDataSlice.actions;
export const cookiesDataReducer = cookiesDataSlice.reducer;