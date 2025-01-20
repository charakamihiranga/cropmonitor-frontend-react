import {Equipment} from "../model/Equipment.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import equipmentDummyData from "../dummyData/EquipmentDummyData.ts";

const initialState: Equipment[] = equipmentDummyData;
const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        addEquipment: (state, action: PayloadAction<Equipment>) => {
            state.push(action.payload);
        },
        removeEquipment: (state, action: PayloadAction<string>) => {
            return state.filter(equipment => equipment.equipmentId !== action.payload);
        }
    },
});
export const { addEquipment, removeEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;