import {createSlice} from "@reduxjs/toolkit";
import {EditorState,convertToRaw} from "draft-js";
let count=0;
export const pageSlice = createSlice({
    name:'editorState',
    initialState:{ "scrollable-auto-tab-0":
            convertToRaw(EditorState.createEmpty().getCurrentContent())},
    reducers:{
        "abc":(state,action)=> {
                return ({...state, [action.payload.id]: action.payload.body})
        }
    }
})

export const {abc} = pageSlice.actions;
export default pageSlice.reducer;