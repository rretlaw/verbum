import {
  LexicalComposer,
  InitialEditorStateType,
} from '@lexical/react/LexicalComposer';
import React from 'react';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import './EditorComposer.css';
import i18n from './locale';
import { I18nextProvider } from 'react-i18next';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';


interface IEditorComposer {
  children: React.ReactElement;
  initialEditorState?: InitialEditorStateType;
  editorNamespace?: string;
  initialHtmlContent?: string;
}


function LoadHtmlPlugin({initialHtmlContent}: {initialHtmlContent: string;}) {
  
  if (!initialHtmlContent) return null;
  
  const [editor] = useLexicalComposerContext();

  editor.update(() => {
    let nodes = [];
    const html = initialHtmlContent;

    // Parse html
    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");
    nodes = $generateNodesFromDOM(editor, dom);

    // Set content
    const root = $getRoot();
    root.clear();
    root.append(...nodes);
  });

  return null;
}


const EditorComposer = ({ children, initialEditorState, editorNamespace, initialHtmlContent }: IEditorComposer) => {
  
  /*
  const [editor] = useLexicalComposerContext();

  editor.update(() => {
    editor.setEditable(true);
  })
  */

  console.log("initialEditorState: ", initialEditorState)
  console.log("editorNamespace: ", editorNamespace)
  console.log("initialHtmlContent: ", initialHtmlContent)

  const initialConfig = {
    namespace: editorNamespace ,
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editorState: initialEditorState,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {initialHtmlContent != null && <LoadHtmlPlugin initialHtmlContent={initialHtmlContent} />}
      <I18nextProvider i18n={i18n}>
        <div className="editor-shell">{children}</div>
      </I18nextProvider>
    </LexicalComposer>
  );
};

export default EditorComposer;
