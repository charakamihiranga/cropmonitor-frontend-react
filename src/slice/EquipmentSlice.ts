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
        },
        updateEquipment: (state, action: PayloadAction<Equipment>) => {
            const index = state.findIndex(equipment => equipment.equipmentId === action.payload.equipmentId);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    },
});
export const { addEquipment, removeEquipment, updateEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;