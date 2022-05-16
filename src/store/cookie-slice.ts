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
            document.cookie = "cookieBannerClicked=true; expires=0; path=/";
            state.bannerVisible = false;
        },
    },
});

export const { hideBanner } = cookieSlice.actions;
export default cookieSlice.reducer;
