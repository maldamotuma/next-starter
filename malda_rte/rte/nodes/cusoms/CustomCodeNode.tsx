import { CodeNode, SerializedCodeNode } from "@lexical/code";
import { DOMExportOutput } from "lexical";
import utils from "@lexical/utils";

const LANGUAGE_DATA_ATTRIBUTE = 'data-highlight-language';


export class CustomCodeNode extends CodeNode {
    static getType(): string {
        return "custom-code";
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement('code');
        element.setAttribute('spellcheck', 'false');
        element.classList.add("PlaygroundEditorTheme__code");
        const language = this.getLanguage();
        if (language) {
            element.setAttribute(LANGUAGE_DATA_ATTRIBUTE, language);
        }
        return {
            element
        };
    }

    

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: 'custom-code',
        };
    }
}