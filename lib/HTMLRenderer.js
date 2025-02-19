"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const expo_image_1 = require("expo-image");
const node_html_parser_1 = require("node-html-parser");
const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const HTMLRenderer = ({ html, customStyles = {}, onLinkPress, onButtonPress }) => {
    const renderText = (text) => {
        return text.trim() ? <react_native_1.Text>{text}</react_native_1.Text> : null;
    };
    const getClassStyles = (node) => {
        var _a;
        try {
            const className = (_a = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _a === void 0 ? void 0 : _a.call(node, 'class');
            if (!className)
                return [];
            const classNames = className.split(' ');
            return classNames.reduce((styles, name) => {
                if (customStyles[name]) {
                    return [...styles, customStyles[name]];
                }
                return styles;
            }, []);
        }
        catch (error) {
            console.warn('Error getting class styles:', error);
            return [];
        }
    };
    const getAttribute = (node, attr) => {
        var _a;
        try {
            return ((_a = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _a === void 0 ? void 0 : _a.call(node, attr)) || '';
        }
        catch (error) {
            console.warn(`Error getting attribute ${attr}:`, error);
            return '';
        }
    };
    const renderNode = (node) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!node)
            return null;
        if (typeof node === 'string')
            return renderText(node);
        const classStyles = getClassStyles(node);
        const tagName = (_b = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a);
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
                const level = tagName;
                return (<react_native_1.Text style={[styles[level], customStyles[level], ...classStyles]}>
            {node.textContent}
          </react_native_1.Text>);
            case 'p':
                return (<react_native_1.Text style={[styles.paragraph, customStyles.p, ...classStyles]}>
            {renderChildren(node)}
          </react_native_1.Text>);
            case 'div':
                return (<react_native_1.View style={[styles.div, customStyles.div, ...classStyles]}>
            {renderChildren(node)}
          </react_native_1.View>);
            case 'span':
                return (<react_native_1.Text style={[styles.span, customStyles.span, ...classStyles]}>
            {renderChildren(node)}
          </react_native_1.Text>);
            case 'strong':
            case 'b':
                return (<react_native_1.Text style={[styles.bold, customStyles.bold, ...classStyles]}>
            {renderChildren(node)}
          </react_native_1.Text>);
            case 'em':
            case 'i':
                return (<react_native_1.Text style={[styles.italic, customStyles.italic, ...classStyles]}>
            {renderChildren(node)}
          </react_native_1.Text>);
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
                return (<react_native_1.Text style={[styles.link, customStyles.a, ...classStyles]} onPress={() => onLinkPress && onLinkPress(href, node.textContent || '', linkAttributes)}>
            {renderChildren(node)}
          </react_native_1.Text>);
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
                return (<react_native_1.TouchableOpacity style={[styles.button, customStyles.button, ...classStyles]} onPress={() => onButtonPress && onButtonPress(node.textContent || '', buttonAttributes)} disabled={buttonAttributes.disabled === 'true'}>
            <react_native_1.Text style={[styles.buttonText, customStyles.buttonText]}>
              {renderChildren(node)}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>);
            case 'ul':
                return (<react_native_1.View style={[styles.ul, customStyles.ul, ...classStyles]}>
            {((_d = (_c = node.childNodes) === null || _c === void 0 ? void 0 : _c.map) === null || _d === void 0 ? void 0 : _d.call(_c, (child, index) => (<react_native_1.View key={index} style={styles.listItem}>
                {renderNode(child)}
              </react_native_1.View>))) || null}
          </react_native_1.View>);
            case 'ol':
                return (<react_native_1.View style={[styles.ol, customStyles.ol, ...classStyles]}>
            {((_f = (_e = node.childNodes) === null || _e === void 0 ? void 0 : _e.map) === null || _f === void 0 ? void 0 : _f.call(_e, (child, index) => (<react_native_1.View key={index} style={styles.orderedListItem}>
                <react_native_1.View style={styles.orderedListNumber}>
                  <react_native_1.Text style={styles.orderNumber}>{index + 1}.</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={styles.orderedListContent}>
                  {renderNode(child)}
                </react_native_1.View>
              </react_native_1.View>))) || null}
          </react_native_1.View>);
            case 'li':
                return (<react_native_1.Text style={[styles.li, customStyles.li, ...classStyles]}>
            {((_h = (_g = node.parentNode) === null || _g === void 0 ? void 0 : _g.tagName) === null || _h === void 0 ? void 0 : _h.toLowerCase()) === 'ol'
                        ? node.textContent || ''
                        : `• ${node.textContent || ''}`}
          </react_native_1.Text>);
            case 'img':
                const src = getAttribute(node, 'src');
                return (<expo_image_1.Image source={src} style={[styles.image, customStyles.img, ...classStyles]} contentFit="cover" transition={1000} placeholder={{ blurhash }} onError={(error) => {
                        console.warn('Image loading error:', error);
                    }}/>);
            default:
                if (node.childNodes && node.childNodes.length > 0) {
                    return renderChildren(node);
                }
                return renderText(node.textContent || '');
        }
    };
    const renderChildren = (node) => {
        if (!node.childNodes)
            return renderText(node.textContent || '');
        return node.childNodes.map((child, index) => (<react_1.default.Fragment key={index}>
        {renderNode(child)}
      </react_1.default.Fragment>));
    };
    try {
        const parsedHtml = (0, node_html_parser_1.parse)(html || '');
        return (<react_native_1.ScrollView style={styles.container}>
        {renderNode(parsedHtml)}
      </react_native_1.ScrollView>);
    }
    catch (error) {
        console.error('Error parsing HTML:', error);
        return (<react_native_1.ScrollView style={styles.container}>
        <react_native_1.Text style={styles.errorText}>HTML content could not be loaded.</react_native_1.Text>
      </react_native_1.ScrollView>);
    }
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = HTMLRenderer;
