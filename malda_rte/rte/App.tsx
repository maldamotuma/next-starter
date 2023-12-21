"use client"
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $createLinkNode } from '@lexical/link';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import * as React from 'react';

import { DEFAULT_SETTINGS, isDevPlayground, SettingName } from './appSettings';
import { SettingsContext, useSettings } from './context/SettingsContext';
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import Editor from './Editor';
import logo from './images/logo.svg';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import DocsPlugin from './plugins/DocsPlugin';
import PasteLogPlugin from './plugins/PasteLogPlugin';
import { TableContext } from './plugins/TablePlugin';
import TestRecorderPlugin from './plugins/TestRecorderPlugin';
import TypingPerfPlugin from './plugins/TypingPerfPlugin';
import Settings from './Settings';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

import './setupEnv';
import './index.css';
import { Alert, alpha, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
// Handle runtime errors
const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get('vite-error-overlay');
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

if (typeof window !== "undefined") {
  window.addEventListener('error', showErrorOverlay);
  window.addEventListener('unhandledrejection', ({ reason }) =>
    showErrorOverlay(reason),
  );
}

// console.warn(
//   'If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.',
// );

// declare global {
//   interface Document {
//     documentMode?: unknown;
//   }

//   interface Window {
//     MSStream?: unknown;
//   }
// }

function prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to the playground'));
    root.append(heading);
    const quote = $createQuoteNode();
    quote.append(
      $createTextNode(
        `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
        `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
      ),
    );
    root.append(quote);
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('The playground is a demo environment built with '),
      $createTextNode('@lexical/react').toggleFormat('code'),
      $createTextNode('.'),
      $createTextNode(' Try typing in '),
      $createTextNode('some text').toggleFormat('bold'),
      $createTextNode(' with '),
      $createTextNode('different').toggleFormat('italic'),
      $createTextNode(' formats.'),
    );
    root.append(paragraph);
    const paragraph2 = $createParagraphNode();
    paragraph2.append(
      $createTextNode(
        'Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!',
      ),
    );
    root.append(paragraph2);
    const paragraph3 = $createParagraphNode();
    paragraph3.append(
      $createTextNode(`If you'd like to find out more about Lexical, you can:`),
    );
    root.append(paragraph3);
    const list = $createListNode('bullet');
    list.append(
      $createListItemNode().append(
        $createTextNode(`Visit the `),
        $createLinkNode('https://lexical.dev/').append(
          $createTextNode('Lexical website'),
        ),
        $createTextNode(` for documentation and more information.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Check out the code on our `),
        $createLinkNode('https://github.com/facebook/lexical').append(
          $createTextNode('GitHub repository'),
        ),
        $createTextNode(`.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Playground code can be found `),
        $createLinkNode(
          'https://github.com/facebook/lexical/tree/main/packages/lexical-playground',
        ).append($createTextNode('here')),
        $createTextNode(`.`),
      ),
      $createListItemNode().append(
        $createTextNode(`Join our `),
        $createLinkNode('https://discord.com/invite/KmG4wQnnD9').append(
          $createTextNode('Discord Server'),
        ),
        $createTextNode(` and chat with the team.`),
      ),
    );
    root.append(list);
    const paragraph4 = $createParagraphNode();
    paragraph4.append(
      $createTextNode(
        `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`,
      ),
    );
    root.append(paragraph4);
  }
}

interface AppProps {
  settings?: { [key in SettingName]?: boolean };
  onChange?: (ev: string) => void;
  value?: string;
  notEditable?: boolean;
  minChars?: number;
}

function App(props: AppProps): JSX.Element {
  const { settings: userSS, value, onChange, notEditable, minChars } = props;
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: value ? value : isCollab
      ? null
      : emptyEditor
        ? undefined
        : prepopulatedRichText,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editable: !notEditable,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor
                settings={{
                  ...(DEFAULT_SETTINGS),
                  ...(userSS)
                }}
                {...({ value, onChange, notEditable })}
                minChars={minChars}
              />
            </div>
            <Settings />
            {/* {isDevPlayground ? <DocsPlugin /> : null}
            {isDevPlayground ? <PasteLogPlugin /> : null}
            {isDevPlayground ? <TestRecorderPlugin /> : null} */}

            {measureTypingPerf ? <TypingPerfPlugin /> : null}
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PlaygroundApp(props: AppProps): JSX.Element {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Alert severity='info' sx={{ my: 1 }}>Loading...</Alert>
  }
  return (
    <Box
      sx={{
        "& .PlaygroundEditorTheme__code": {
          bgcolor: theme => alpha(theme.palette.primary.dark, .075),
          borderRadius: 3
        },
        "& .PlaygroundEditorTheme__code::before": {
          bgcolor: "divider",
          display: "none"
        },
        "& .PlaygroundEditorTheme__textCode": {
          bgcolor: "divider"
        },
        "& .PlaygroundEditorTheme__quote": {
          color: "text.secondary",
          borderLeftColor: "divider"
        },
        "& .table-of-contents .first-heading": {
          color: "text.primary"
        },
        "& .table-of-contents .normal-heading-wrapper": {
          color: "text.secondary",
          mb: 1,
          pb: 1,
          ml: 1
        },
        "& .table-of-contents .headings::before": {
          bgcolor: theme => `${alpha(theme.palette.primary.dark, .2)} !important`,
        },
        "& .table-of-contents .headings": {
          width: "100%",
          pr: 2
        },
        "& .selected-heading-wrapper::before": {
          bgcolor: theme => alpha(theme.palette.primary.dark, 1),
          borderColor: theme => alpha(theme.palette.primary.dark, 1),
        },
        "& .Collapsible__container": {
          bgcolor: theme => alpha(theme.palette.primary.dark, .075),
          borderColor: "divider"
        },
        "& .Collapsible__title::before": {
          borderLeftColor: "primary.dark"
        },
        "& .Collapsible__container[open] .Collapsible__title:before": {
          borderTopColor: "primary.dark"
        },
        "& .PlaygroundEditorTheme__tableCellHeader": {
          bgcolor: "divider"
        },
        "& button": {
          color: `${blue[900]} !important`,
          fontWeight: 700
        }
      }}
    >
      <SettingsContext>
        <App {...props} />
      </SettingsContext>
    </Box>
  );
}
