import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDeepTextAnalyse} from "@/types/IDeepTextAnalyse";


const initialState: IDeepTextAnalyse = {
	trustСoeff: 0,
	text: '',
	sentences: []
};

export const ReliabilitySlice = createSlice({
    name: "reliability",
    initialState,
    reducers: {
        updateReliability(state, action: PayloadAction<IDeepTextAnalyse>) {
            return action.payload;
        }
    }
})

export const {
	updateReliability
} = ReliabilitySlice.actions;

export default ReliabilitySlice.reducer;