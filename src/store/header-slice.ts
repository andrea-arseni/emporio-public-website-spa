import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
    optionsVisibility: boolean;
    sidebarVisibility: boolean;
}

const initialState = {
    optionsVisibility: false,
    sidebarVisibility: false,
} as HeaderState;

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        toggleOptionsVisibility(state) {
            state.optionsVisibility = !state.optionsVisibility;
        },
        toggleSidebarVisibility(state) {
            state.sidebarVisibility = !state.sidebarVisibility;
        },
        hideOptions(state) {
            state.optionsVisibility = false;
        },
        hideSidebar(state) {
            state.sidebarVisibility = false;
        },
        /* incrementByAmount(state, action: PayloadAction<number>) {
            state.value += action.payload;
        }, */
    },
});

export const {
    toggleOptionsVisibility,
    toggleSidebarVisibility,
    hideOptions,
    hideSidebar,
} = headerSlice.actions;
export default headerSlice.reducer;
