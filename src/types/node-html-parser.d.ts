declare module 'node-html-parser' {
  interface HTMLElement {
    tagName: string;
    textContent: string;
    childNodes: HTMLElement[];
    parentNode: HTMLElement;
    getAttribute(name: string): string;
  }

  export function parse(html: string): HTMLElement;
} 