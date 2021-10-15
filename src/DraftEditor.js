import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {convertFromRaw, Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import {useDispatch} from "react-redux";

const timeoutConstant = 1;
let notificationTimer = null;


const DraftEditor = ({keyq, callback}) => {

    /*
   const recurrentFunc = () => {
       notificationTimer = setTimeout(() => {
           somefunc(editorStateLocal) //
       }, timeoutConstant * 1000);
   }
     */
    console.log(keyq);
    const storageKey = "name";
    const storeRaw = localStorage.getItem(storageKey);

   /* if (key) {
        setEditorStateLocal(EditorState.createWithContent(key))
    }*/

    const toggleInlineStyle = (event) => {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        console.log(RichUtils.toggleInlineStyle(keyq, style));
        handleChange(RichUtils.toggleInlineStyle(keyq, style))
    }
    const onStorageUpdate = (e) => {
        console.log("onstorage", e)
        const {key, newValue} = e;
        if (key === storageKey) {
            const rawContentFromStore = convertFromRaw(JSON.parse(newValue));
            callback(EditorState.createWithContent(rawContentFromStore));
        }
    };
    const dispatch = useDispatch();
    const handleChange = (e) => {
        console.log("callback happended")
        callback(e) //
    };

    /*useEffect(() => {
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    },);*/
    const ref1 = useRef();
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(keyq, command)
        if (newState) {
            handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    return (
        <div className="my-little-app" hidden={false/*props.value !== props.index*/}>
            <h1>Playing with Draft!</h1>
           <input
                type="button"
                value="Bold"
                data-style="BOLD"
                onMouseDown={toggleInlineStyle}
            />

            <input
                type="button"
                value="Italic"
                data-style="ITALIC"
                onMouseDown={toggleInlineStyle}
            />

            <div className="draft-editor-wrapper" onClick={() => ref1.current.focus()}>
                <Editor
                    editorState={keyq}
                    onChange={handleChange}
                    handleKeyCommand={handleKeyCommand}
                    ref={ref1}
                    toolbar={{
                        inline: {inDropdown: true},
                        list: {inDropdown: true},
                        textAlign: {inDropdown: true},
                        link: {inDropdown: true},
                        history: {inDropdown: true},
                    }}/>
            </div>

        </div>
    );


}

export default DraftEditor;