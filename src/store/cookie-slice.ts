import { createSlice } from "@reduxjs/toolkit";

interface CookieState {
    bannerVisible: boolean;
}

const initialState = {
    bannerVisible: true,
} as CookieState;

const cookieSlice = createSlice({
    name: "cookiesBanner",
    initialState,
    reducers: {
        hideBanner(state) {
            state.bannerVisible = false;
        },
    },
});

export const { hideBanner } = cookieSlice.actions;
export default cookieSlice.reducer;
