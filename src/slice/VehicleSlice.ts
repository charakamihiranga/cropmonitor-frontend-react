import {Vehicle} from "../model/Vehicle.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Vehicle[] = [];
const vehicleSlice = createSlice({
    name : 'vehicle',
    initialState,
    reducers: {
        addVehicle: (state, action: PayloadAction<Vehicle>) => {
            console.log(action.payload);
            state.push(action.payload);
        }
    }
});

export const {addVehicle} = vehicleSlice.actions;
export default vehicleSlice.reducer;