import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { parse } from 'node-html-parser';

interface HTMLRendererProps {
  html: string;
  customStyles?: {
    [key: string]: any;
  };
  onLinkPress?: (url: string, text: string, attributes: { [key: string]: string }) => void;
  onButtonPress?: (text: string, attributes: { [key: string]: string }) => void;
}
const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ 
  html, 
  customStyles = {}, 
  onLinkPress,
  onButtonPress 
}) => {
  const renderText = (text: string) => {
    return text.trim() ? <Text>{text}</Text> : null;
  };

  const getClassStyles = (node: any) => {
    try {
      const className = node?.getAttribute?.('class');
      if (!className) return [];
      
      const classNames = className.split(' ');
      return classNames.reduce((styles: any, name: string) => {
        if (customStyles[name]) {
          return [...styles, customStyles[name]];
        }
        return styles;
      }, []);
    } catch (error) {
      console.warn('Error getting class styles:', error);
      return [];
    }
  };

  const getAttribute = (node: any, attr: string) => {
    try {
      return node?.getAttribute?.(attr) || '';
    } catch (error) {
      console.warn(`Error getting attribute ${attr}:`, error);
      return '';
    }
  };

  const renderNode = (node: any) => {
    if (!node) return null;
    if (typeof node === 'string') return renderText(node);

    const classStyles = getClassStyles(node);
    const tagName = node.tagName?.toLowerCase?.();

    if (!tagName) {
      if (node.childNodes && node.childNodes.length > 0) {
        return renderChildren(node);
      }
      return renderText(node.textContent || '');
    }

    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        const level = tagName as HeadingLevel;
        return (
          <Text style={[styles[level], customStyles[level], ...classStyles]}>
            {node.textContent}
          </Text>
        );
      
      case 'p':
        return (
          <Text style={[styles.paragraph, customStyles.p, ...classStyles]}>
            {renderChildren(node)}
          </Text>
        );

      case 'div':
        return (
          <View style={[styles.div, customStyles.div, ...classStyles]}>
            {renderChildren(node)}
          </View>
        );

      case 'span':
        return (
          <Text style={[styles.span, customStyles.span, ...classStyles]}>
            {renderChildren(node)}
          </Text>
        );

      case 'strong':
      case 'b':
        return (
          <Text style={[styles.bold, customStyles.bold, ...classStyles]}>
            {renderChildren(node)}
          </Text>
        );

      case 'em':
      case 'i':
        return (
          <Text style={[styles.italic, customStyles.italic, ...classStyles]}>
            {renderChildren(node)}
          </Text>
        );

      case 'a':
        const href = getAttribute(node, 'href');
        const linkAttributes = {
          href,
          id: getAttribute(node, 'id'),
          class: getAttribute(node, 'class'),
          target: getAttribute(node, 'target'),
          rel: getAttribute(node, 'rel'),
          title: getAttribute(node, 'title'),
          'data-action': getAttribute(node, 'data-action'),
        };
        return (
          <Text
            style={[styles.link, customStyles.a, ...classStyles]}
            onPress={() => onLinkPress && onLinkPress(href, node.textContent || '', linkAttributes)}
          >
            {renderChildren(node)}
          </Text>
        );

      case 'button':
        const buttonAttributes = {
          id: getAttribute(node, 'id'),
          class: getAttribute(node, 'class'),
          type: getAttribute(node, 'type'),
          name: getAttribute(node, 'name'),
          value: getAttribute(node, 'value'),
          'data-action': getAttribute(node, 'data-action'),
          disabled: getAttribute(node, 'disabled'),
        };
        return (
          <TouchableOpacity
            style={[styles.button, customStyles.button, ...classStyles]}
            onPress={() => onButtonPress && onButtonPress(node.textContent || '', buttonAttributes)}
            disabled={buttonAttributes.disabled === 'true'}
          >
            <Text style={[styles.buttonText, customStyles.buttonText]}>
              {renderChildren(node)}
            </Text>
          </TouchableOpacity>
        );

      case 'ul':
        return (
          <View style={[styles.ul, customStyles.ul, ...classStyles]}>
            {node.childNodes?.map?.((child: any, index: number) => (
              <View key={index} style={styles.listItem}>
                {renderNode(child)}
              </View>
            )) || null}
          </View>
        );

      case 'ol':
        return (
          <View style={[styles.ol, customStyles.ol, ...classStyles]}>
            {node.childNodes?.map?.((child: any, index: number) => (
              <View key={index} style={styles.orderedListItem}>
                <View style={styles.orderedListNumber}>
                  <Text style={styles.orderNumber}>{index + 1}.</Text>
                </View>
                <View style={styles.orderedListContent}>
                  {renderNode(child)}
                </View>
              </View>
            )) || null}
          </View>
        );

      case 'li':
        return (
          <Text style={[styles.li, customStyles.li, ...classStyles]}>
            {node.parentNode?.tagName?.toLowerCase() === 'ol' 
              ? node.textContent || ''
              : `• ${node.textContent || ''}`}
          </Text>
        );

      case 'img':
        const src = getAttribute(node, 'src');
        return (
          <ExpoImage
            source={src}
            style={[styles.image, customStyles.img, ...classStyles]}
            contentFit="cover"
            transition={1000}
            placeholder={{blurhash}}
            onError={(error) => {
              console.warn('Image loading error:', error);
            }}
          />
        );

      default:
        if (node.childNodes && node.childNodes.length > 0) {
          return renderChildren(node);
        }
        return renderText(node.textContent || '');
    }
  };

  const renderChildren = (node: any) => {
    if (!node.childNodes) return renderText(node.textContent || '');
    return node.childNodes.map((child: any, index: number) => (
      <React.Fragment key={index}>
        {renderNode(child)}
      </React.Fragment>
    ));
  };

  try {
    const parsedHtml = parse(html || '');
    return (
      <ScrollView style={styles.container}>
        {renderNode(parsedHtml)}
      </ScrollView>
    );
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.errorText}>HTML content could not be loaded.</Text>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  errorText: {
    color: '#B3261E',
    fontSize: 16,
    padding: 16,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: '#F9DEDC',
    borderRadius: 12,
    marginVertical: 8,
  },
  div: {
    marginVertical: 0,
  },
  span: {
    fontSize: 16,
    color: '#1C1B1F',
    lineHeight: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 24,
    color: '#1C1B1F',
    letterSpacing: 0,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 20,
    color: '#1C1B1F',
    letterSpacing: 0,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 16,
    color: '#1C1B1F',
    letterSpacing: 0,
    lineHeight: 32,
  },
  h4: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 16,
    color: '#1C1B1F',
    letterSpacing: 0,
    lineHeight: 28,
  },
  h5: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 12,
    color: '#1C1B1F',
    lineHeight: 26,
  },
  h6: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 12,
    color: '#1C1B1F',
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 8,
    lineHeight: 24,
    color: '#49454F',
    letterSpacing: 0.5,
  },
  bold: {
    fontWeight: '600',
    color: '#1C1B1F',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: '#6750A4',
    textDecorationLine: 'none',
    fontWeight: '500',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6750A4',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
    textTransform: 'capitalize',
  },
  ul: {
    marginLeft: 0,
    marginVertical: 12,
  },
  ol: {
    marginLeft: 0,
    marginVertical: 12,
  },
  orderedListItem: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-start',
    paddingRight: 16,
  },
  orderedListNumber: {
    width: 32,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  orderedListContent: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6750A4',
    letterSpacing: 0.1,
  },
  li: {
    fontSize: 15,
    lineHeight: 22,
    color: '#A5A5A5',
    marginBottom: 12,
    paddingLeft: 24,
    position: 'relative',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 0,
    paddingRight: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default HTMLRenderer; 