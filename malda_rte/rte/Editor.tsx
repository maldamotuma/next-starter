/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { createWebsocketProvider } from './collaboration';
import { SettingsContextShape, useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import TableCellNodes from './nodes/TableCellNodes';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import CommentPlugin from './plugins/CommentPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import InlineImagePlugin from './plugins/InlineImagePlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import PollPlugin from './plugins/PollPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { CAN_USE_DOM } from '../packages/shared/canUseDOM';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $insertNodes, EditorState, LexicalEditor, createEditor } from 'lexical';
import { $rootTextContent } from '@lexical/text';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { Button } from '@mui/material';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


const skipCollaborationInit =
  // @ts-ignore
  (typeof window !== "undefined") && (window.parent != null && window.parent.frames.right === window);

export default function Editor({
  settings,
  onChange,
  value,
  notEditable,
  minChars,
  setEditorRef
}:
  {
    settings: SettingsContextShape["settings"];
    onChange?: (ev: string) => void;
    value?: string;
    notEditable?: boolean;
    minChars?: number;
    setEditorRef?: (myVar: {
      editor?: LexicalEditor;
      state?: EditorState;
    }) => void;
  }
): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const {
    isCollab,
    isAutocomplete,
    isMaxLength,
    isCharLimit,
    isCharLimitUtf8,
    isRichText,
    showTreeView,
    showTableOfContents,
    shouldUseLexicalContextMenu,
    tableCellMerge,
    tableCellBackgroundColor,
  } = settings;
  const isEditable = useLexicalEditable();
  const text = value ? "" : isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
      ? 'Enter some rich text...'
      : 'Enter some plain text...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const rendered = React.useRef<boolean>(true);

  const stopPropagation = React.useCallback(
    (e: Event) => {
      // e.stopPropagation();
    }
    ,
    [],
  )


  useEffect(() => {
    const btns = document.querySelectorAll(".malda-rte button");
    btns.forEach(btn => {
      btn.addEventListener("click", stopPropagation);
    });
    if (setEditorRef) setEditorRef({
      editor
    })
    if (rendered.current) {
      if (value) {
        editor.update(() => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(value, "text/html");

          const nodes = $generateNodesFromDOM(editor, dom);

          $getRoot().select();

          $insertNodes(nodes);
        })
      }
    } else {
      rendered.current = false;
    }

    return () => {
      btns.forEach(btn => {
        btn.removeEventListener("click", stopPropagation);
      });
    }
  }, [])

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const handleChange = (editorState: EditorState) => {
    if (minChars && (editorState.read($rootTextContent).trim().length < minChars)) {
      if (onChange) onChange("");
      return false;
    }
    if (onChange) {
      const es = JSON.stringify(editorState);
      onChange(es);
    }
    if (setEditorRef) {
      setEditorRef({
        state: editorState
      });
    }
  }

  return (
    <>
      <OnChangePlugin onChange={handleChange} />
      {isRichText && !notEditable && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''
          }`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        {/* {
          !noAutoFocus &&
          <AutoFocusPlugin />
        } */}
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        {/* <CommentPlugin
          providerFactory={isCollab ? createWebsocketProvider : undefined}
        /> */}
        {isRichText ? (
          <>
            {isCollab ? (
              <CollaborationPlugin
                id="main"
                providerFactory={createWebsocketProvider}
                shouldBootstrap={!skipCollaborationInit}
              />
            ) : (
              <HistoryPlugin externalHistoryState={historyState} />
            )}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller" style={{
                  ...(notEditable && {
                    resize: "none"
                  })
                }}>
                  <div className="editor" ref={onRef} style={{
                    ...(notEditable && {
                      resize: "none"
                    })
                  }}>
                    <ContentEditable />
                  </div>
                </div>
              }
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
            />
            <TableCellResizer />
            <NewTablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="TableNode__contentEditable" />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MentionsPlugin />
              <HistoryPlugin />
              <ImagesPlugin captionsEnabled={false} />
              <LinkPlugin />
              <LexicalClickableLinkPlugin />
              <FloatingTextFormatToolbarPlugin />
            </NewTablePlugin>
            <ImagesPlugin />
            <InlineImagePlugin />
            <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            <PageBreakPlugin />
            <LayoutPlugin />
            {!notEditable && floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableCellActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={5}
          />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {
          !notEditable &&
          <ActionsPlugin isRichText={isRichText} />
        }
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}

export const useEditor = ({ editor, editorState }: {
  editor: LexicalEditor | null;
  editorState: EditorState | null;
}) => {
  const toHTML = () => {
    let htmlString = "";
    if (editor) {
      editorState?.read(() => {
        const raw = $generateHtmlFromNodes(editor, null);
        htmlString = raw;
      });
    }


    return htmlString;
  }

  return {
    toHTML
  };
}
