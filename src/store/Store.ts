import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "../slice/StaffSlice.ts";

export const store = configureStore({
    reducer: {
        staff : staffSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;