import { configureStore } from "@reduxjs/toolkit";

import headerReducer from "./header-slice";
import cookieReducer from "./cookie-slice";
import houseReducer from "./houses-slice";

const store = configureStore({
    reducer: {
        header: headerReducer,
        cookiesBanner: cookieReducer,
        houses: houseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
