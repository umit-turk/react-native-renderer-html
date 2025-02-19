import React from 'react';
interface HTMLRendererProps {
    html: string;
    customStyles?: {
        [key: string]: any;
    };
    onLinkPress?: (url: string, text: string, attributes: {
        [key: string]: string;
    }) => void;
    onButtonPress?: (text: string, attributes: {
        [key: string]: string;
    }) => void;
}
declare const HTMLRenderer: React.FC<HTMLRendererProps>;
export default HTMLRenderer;
