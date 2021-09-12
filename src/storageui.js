import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { Editor, EditorState, RichUtils, SelectionState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
const customStyleMap = {
    redBackground: {
        backgroundColor: 'red'
    },
    underlined: {
        textDecoration: 'underline',
        fontSize: 26
    },
};

class Container extends React.Component {
    constructor(props) {
        super(props);

        let initialEditorState = null;
        const storeRaw = localStorage.getItem('draftRaw');

        if (storeRaw) {
            const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
            initialEditorState = EditorState.createWithContent(rawContentFromStore);
        } else {
            initialEditorState = EditorState.createEmpty();
        }

        this.state = {
            editorState: initialEditorState
        };
    }

    applyCustomStyles = (nameOfCustomStyle) => {
        this._handleChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                nameOfCustomStyle
            )
        );
    }

    saveRaw = () => {
        var contentRaw = convertToRaw(this.state.editorState.getCurrentContent());

        localStorage.setItem('draftRaw', JSON.stringify(contentRaw));
    }

    _handleChange = (editorState) => {
        this.setState({ editorState });
    }

    render() {
        return (
            <div>
                <div className="container-root">
                    <Editor
                        placeholder="Type away :)"
                        editorState={this.state.editorState}
                        onChange={this._handleChange}
                        customStyleMap={customStyleMap}
                    />
                </div>
                <button onClick={() => this.applyCustomStyles('underlined')}>
                    apply one custom style to selected text
                </button>
                <button onClick={() => this.applyCustomStyles('redBackground')}>
                    apply anoter custom style to selected text
                </button>
                <div>
                    <button onClick={this.saveRaw}>
                        SAVE RAW CONTENT TO LOCAL STORAGE
                    </button>
                </div>
            </div>
        );
    }
}

export default Container;