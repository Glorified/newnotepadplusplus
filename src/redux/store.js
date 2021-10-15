import {configureStore} from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";
import { getDefaultMiddleware,compose,applyMiddleware } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { withReduxStateSync } from 'redux-state-sync'
/*const persistedState = localStorage.getItem('editorState')
    ? JSON.parse(localStorage.getItem('editorState'))
    : {}*/
//https://daverivera90.medium.com/sharing-state-between-browser-tabs-with-redux-68899eb88fb7
const storageKey = 'editorState'
// const enhancer = compose(applyMiddleware(storageMiddleware()))
/*export function storageMiddleware() {
    return () => next => action => {
        console.log(action);

        if (!action.source) {
            let localStoreObj = JSON.parse(localStorage.getItem(storageKey))
            const wrappedAction = Object.assign({ source: 'another tab' }, action)
            localStoreObj = {...localStoreObj, [action.payload.id]: action.payload.body}
            localStorage.setItem(storageKey, JSON.stringify(wrappedAction))
        }
        next(action)
    }
}


export function createStorageListener(store) {
    return () => {
        const wrappedAction = JSON.parse(localStorage.getItem(storageKey))
        delete wrappedAction.source
        console.log('something here')
        store.dispatch(wrappedAction)
    }
}*/

const config = {}
export default configureStore({
    reducer: {
        pageReducer: withReduxStateSync(pageReducer)
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat( createStateSyncMiddleware(config)),
    devTools: true
})

