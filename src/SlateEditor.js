import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { Editor, EditorState, RichUtils, SelectionState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
const  App = (props) => {

    const storageKey = props.index;
    const storeRaw = localStorage.getItem(storageKey);
    const [editorState, setEditorState] = useState(()=>{
        if (storeRaw) {
            const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
            return EditorState.createWithContent(rawContentFromStore);
        } else {
            return EditorState.createEmpty();
        }
    });

    const abc = () => {

        if (storeRaw) {
            const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
            return EditorState.createWithContent(rawContentFromStore);
        } else {
            return EditorState.createEmpty();
        }
    };


const  saveRaw = () => {
    console.log(editorState.getCurrentContent())
    let contentRaw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem(storageKey, JSON.stringify(contentRaw));
}


    const toggleInlineStyle =(event) => {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        setEditorState( RichUtils.toggleInlineStyle(editorState, style))
    }
    const onStorageUpdate = (e) => {
        console.log("onstorage",e)
        const { key, newValue } = e;
        if (key === storageKey) {
            const rawContentFromStore = convertFromRaw(JSON.parse(newValue));
            setEditorState(EditorState.createWithContent(rawContentFromStore));
        }
    };

    const handleChange = (e) => {
        setEditorState(e);
        saveRaw();
    };
    useEffect(() => {

      window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, );

    const ref1 = useRef();

        return (
            <div className="my-little-app" hidden={ false/*props.value !== props.index*/}>
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