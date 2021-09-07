import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { Editor, EditorState, RichUtils } from 'draft-js';
import * as SelectionState from "draft-js";
const  App = () => {


    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const contentState = editorState.getCurrentContent();
    const contentStateWithSelectionBefore = contentState.set(
        'selectionBefore',
        SelectionState.createEmpty(contentState.getBlockForKey('1pu4d')),
    );
  /* const toggleInlineStyle =(event) => {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        this.setState({
            editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
        });
    }
*/
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === "name") {
            setEditorState(newValue);
        }
    };

    const handleChange = (e) => {
        console.log("aakash",e);
        setEditorState(e);
        localStorage.setItem("name",JSON.stringify(e));
        console.log("parse",JSON.parse(localStorage.getItem("name")))
    };

    useEffect(() => {
        setEditorState( JSON.parse(localStorage.getItem("name")));//localStorage.getItem("name") ||
      window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, );


    const ref1 = useRef();

        return (
            <div className="my-little-app" >
                <h1>Playing with Draft!</h1>
                <input
                    type="button"
                    value="Bold"
                    data-style="BOLD"

                />

                <input
                    type="button"
                    value="Italic"
                    data-style="ITALIC"

                />

                <div className="draft-editor-wrapper" onClick={()=>ref1.current.focus()}>
                    <Editor
                        editorState={editorState}
                        onChange={handleChange}
                        ref={ref1}
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                        }}/>
                </div>
            </div>
        );




}

export default App;