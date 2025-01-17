import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "../slice/StaffSlice.ts";
import vehicleSlice from "../slice/VehicleSlice.ts";

export const store = configureStore({
    reducer: {
        staff : staffSlice,
        vehicle : vehicleSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;