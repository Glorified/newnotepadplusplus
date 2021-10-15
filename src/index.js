import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SlateEditor from "./SlateEditor";
import Container from "./storageui";
import ScrollableTabsButtonAuto from "./ScrollableTabs";
import Mycentime from "./mycentime";
import { Provider } from 'react-redux'
// import store, {createStorageListener} from "./redux/store";
import store from "./redux/store";
import DraftEditor from "./DraftEditor";
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
/*
store.subscribe(()=>{
    localStorage.setItem('editorState', JSON.stringify(store.getState()))
})
*/

initStateWithPrevTab(store)
// window.addEventListener('storage', createStorageListener(store))
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
     {/*<SlateEditor/>*/}
     <ScrollableTabsButtonAuto/>
    {/*<Mycentime/>*/}
    {/*      <DraftEditor/>*/}
      {/*<Container/>*/}
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

