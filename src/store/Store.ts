import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "../slice/StaffSlice.ts";
import vehicleSlice from "../slice/VehicleSlice.ts";
import fieldSlice from "../slice/FieldSlice.ts";
import equipmentSlice from "../slice/EquipmentSlice.ts";
import CropSlice from "../slice/CropSlice.ts";
import LogSlice from "../slice/LogSlice.ts";

export const store = configureStore({
    reducer: {
        staff : staffSlice,
        vehicle : vehicleSlice,
        field: fieldSlice,
        equipment: equipmentSlice,
        crop: CropSlice,
        log: LogSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;