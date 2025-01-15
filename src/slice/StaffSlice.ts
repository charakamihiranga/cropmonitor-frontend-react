import {Staff} from "../model/Staff.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Staff[] = [];

const staffSlice =  createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaffMember: (state, action: PayloadAction<Staff>) => {
            console.log(action.payload);
            state.push(action.payload);
        }
    }
});

export const {addStaffMember} = staffSlice.actions;
export default staffSlice.reducer;