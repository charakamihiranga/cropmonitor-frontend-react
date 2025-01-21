import {Log} from "../model/Log.ts";
import logData from "../dummyData/LogDummyData.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState : Log[] = logData;
const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addLog: ( state, action: PayloadAction<Log>) => {
            state.push(action.payload);
        },
        removeLog: (state, action: PayloadAction<string>) => {
            return state.filter(log => log.logCode !== action.payload);
        },
        updateLog: (state, action: PayloadAction<Log>) => {
            const index = state.findIndex(log => log.logCode === action.payload.logCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});

export const {addLog, removeLog, updateLog} = logSlice.actions;
export default logSlice.reducer;