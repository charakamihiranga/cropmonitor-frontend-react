import {Crop} from "../model/Crop.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import cropDummyData from "../dummyData/CropDummyData.ts";

const initialState: Crop [] = cropDummyData;
const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.push(action.payload);
        },
        removeCrop: (state, action: PayloadAction<string>) => {
            return state.filter(crop => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action: PayloadAction<Crop>) => {
            const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});
export const {addCrop, removeCrop, updateCrop} = cropSlice.actions;
export default cropSlice.reducer;