import { configureStore } from "@reduxjs/toolkit";

import headerReducer from "./header-slice";
import cookieReducer from "./cookie-slice";

const store = configureStore({
    reducer: {
        header: headerReducer,
        cookiesBanner: cookieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
