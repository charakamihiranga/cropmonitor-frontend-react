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
    }
});

export const {addLog} = logSlice.actions;
export default logSlice.reducer;