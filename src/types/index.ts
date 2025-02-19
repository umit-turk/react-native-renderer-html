import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ComponentType } from 'react';

export interface HTMLRendererProps {
  html: string;
  customStyles?: {
    [key: string]: StyleProp<ViewStyle | TextStyle>;
  };
  onLinkPress?: (url: string, text: string, attributes: Record<string, string>) => void;
  onButtonPress?: (text: string, attributes: Record<string, string>) => void;
  components?: {
    [key: string]: ComponentType<any>;
  };
} 