'use client';
import type {EditorActions, EditorNodeType} from "@/lib/types";
import React, {createContext, Dispatch} from "react";

export type EditorNode = EditorNodeType;

export type Editor = {
    elements : EditorNode[]
    edges : {
        id : string
        source : string
        target : string
    }[];
    selectedNode : EditorNodeType
}

export type HistoryState = {
    history : Editor[]
    currentIndex : number
}

export type EditorState = {
    editor : Editor
    history : HistoryState
}

const InitialEditorState : EditorState['editor'] = {
    elements : [],
    edges : [],
    selectedNode : {
        data : {
            completed : false,
            current : false,
            description : '',
            metadata : {},
            title : '',
            type : 'Trigger',
        },
        id : '',
        position : {
            x : 0,
            y : 0,
        },
        type : 'Trigger',
    }
};

const InitialHistoryState : HistoryState = {
    history : [InitialEditorState],
    currentIndex : 0
}

const InitialState : EditorState = {
    editor : InitialEditorState,
    history : InitialHistoryState
}

const editorReducer = (
    state : EditorState = InitialState,
    action : EditorActions
) : EditorState => {

    switch(action.type){
        case 'REDO' :
            if(state.history.currentIndex < state.history.history.length - 1){
                const nextIndex = state.history.currentIndex + 1;
                const nextEditorState = {...state.history.history[nextIndex]}
                const redoState = {
                    ...state,
                    editor : nextEditorState,
                    history : {
                        ...state.history,
                        currentIndex : nextIndex
                    }
                }
                return redoState;
            }
            return state;

        case 'UNDO' :
            if(state.history.currentIndex > 0){
                const prevIndex = state.history.currentIndex - 1;
                const prevEditorState = {...state.history.history[prevIndex]}
                const undoState = {
                    ...state,
                    editor : prevEditorState,
                    history : {
                        ...state.history,
                        currentIndex : prevIndex
                    }
                }
                return undoState;
            }
            return state;

        case 'LOAD_DATA':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    elements: action.payload.elements || [],
                    edges: action.payload.edges,
                },
            }
        case "SELECTED_ELEMENT":
            return {
                ...state,
                editor : {
                    ...state.editor,
                    selectedNode : action.payload.element
                }
            }
        default : return state;
    }
}

export type EditorContextData = {
    previewMode : boolean,
    setPreviewMode : (previewMode : boolean) => void,
}

export const EditorContext = createContext<{
    state: EditorState,
    dispatch: Dispatch<EditorActions>
}>({
    state: InitialState,
    dispatch: () => undefined
})

type EditorProviderProps = {
    children : React.ReactNode
}

const EditorProvider = ({children} : EditorProviderProps) => {
    const [state, dispatch] = React.useReducer(editorReducer, InitialState);

    return (
        <EditorContext.Provider value={{state, dispatch}}>
            {children}
        </EditorContext.Provider>
    )
}

export const useEditor = () => {
    const context = React.useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within a EditorProvider');
    }
    return context;
}

export default EditorProvider

