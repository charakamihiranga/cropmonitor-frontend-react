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
    },
});
export const { addEquipment, } = equipmentSlice.actions;
export default equipmentSlice.reducer;