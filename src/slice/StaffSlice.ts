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
        },
        removeStaffMember: (state, action: PayloadAction<string>) => {
            return state.filter(staff => staff.staffId !== action.payload);
        }
    }
});

export const {addStaffMember, removeStaffMember} = staffSlice.actions;
export default staffSlice.reducer;