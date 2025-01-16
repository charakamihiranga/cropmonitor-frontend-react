import {Staff} from "../model/Staff.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Staff[] = [];

const staffSlice =  createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaffMember: (state, action: PayloadAction<Staff>) => {
            state.push(action.payload);
        },
        removeStaffMember: (state, action: PayloadAction<string>) => {
            return state.filter(staff => staff.staffId !== action.payload);
        },
        updateStaffMember: (state, action: PayloadAction<Staff>) => {
            const index = state.findIndex(staff => staff.staffId === action.payload.staffId);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});

export const {addStaffMember, removeStaffMember, updateStaffMember} = staffSlice.actions;
export default staffSlice.reducer;