# React Native HTML Renderer

[![GitHub](https://img.shields.io/badge/GitHub-View%20on%20GitHub-blue?style=flat&logo=github)](https://github.com/umit-turk/react-native-renderer-html)

A powerful and flexible HTML rendering solution for React Native applications. Transform your HTML content into beautiful native components with full styling support and interactive elements.

Now you can buy me a coffee
<a href="https://www.buymeacoffee.com/umityasarturk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>


## ✨ Features

- 🎨 **Rich Text Formatting**: Full support for HTML text formatting tags with customizable styles
- 🔗 **Interactive Elements**: Customizable buttons and links with action handling
- 📱 **Responsive Design**: Flexible layout system that adapts to different screen sizes
- 🎯 **Custom Styling**: Comprehensive class-based styling system
- 🖼️ **Image Support**: Advanced image rendering with various display options
- 📝 **List Support**: Both ordered and unordered lists with custom styling
- 🔄 **Event Handling**: Rich event system for interactive elements
- 📦 **TypeScript Support**: Full TypeScript definitions included
- 🛡️ **Error Handling**: Robust error handling and fallback options
- 🎭 **Customizable Components**: Override default components with custom implementations


![Image](https://github.com/user-attachments/assets/27c87d5e-30cd-4d6b-9267-6f24cd555f09)

![Image](https://github.com/user-attachments/assets/884159b1-6f0b-4f21-a8fd-d3f7586ad00f)

![Image](https://github.com/user-attachments/assets/d0b2f685-f002-4bdc-844b-8200792e9d74)

## 📦 Installation

1. First install the package:

```bash
# Using npm
npm install react-native-renderer-html
```

```bash
# Using yarn
yarn add react-native-renderer-html
```

2. Install the dependencies:

```bash
# Using npm
npm install expo-image node-html-parser
```

```bash
# Using yarn
yarn add expo-image node-html-parser
```

## 🚀 Basic Usage


```jsx
import React from 'react';
import { View } from 'react-native';
import { HTMLRenderer } from 'react-native-renderer-html';

const MyComponent = () => {
  const htmlContent = `
    <div class="article">
      <h1 class="title">Welcome to My App</h1>
      <p class="description">
        This is a <strong>powerful</strong> HTML renderer for 
        <span class="highlight">React Native</span>.
      </p>
      <img src="https://example.com/image.jpg" class="article-image" />
      <ul class="features">
        <li>Rich text support</li>
        <li>Custom styling</li>
        <li>Interactive elements</li>
      </ul>
      <button class="cta-button" data-action="start">
        Get Started
      </button>
    </div>
  `;

  return (
    <View style={styles.container}>
      <HTMLRenderer 
        html={htmlContent}
        customStyles={{
          'article': {
            padding: 16,
            backgroundColor: '#ffffff',
          },
          'title': {
            fontSize: 24,
            color: '#1a73e8',
            marginBottom: 16,
          },
          'description': {
            fontSize: 16,
            lineHeight: 24,
            color: '#202124',
          },
          'article-image': {
            width: '100%',
            height: 200,
            borderRadius: 8,
          },
          'features': {
            marginVertical: 16,
          },
          'cta-button': {
            backgroundColor: '#1a73e8',
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          },
        }}
        onButtonPress={(text, attributes) => {
          console.log(`Button pressed: ${attributes['data-action']}`);
        }}
      />
    </View>
  );
};
```

## 🎨 Styling Guide

### Class-based Styling System

The renderer uses a powerful class-based styling system that allows you to apply custom styles to any HTML element:

```jsx
const customStyles = {
  // Container styles
  'container': {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Typography styles
  'heading': {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202124',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  
  // List styles
  'custom-list': {
    marginLeft: 0,
    marginVertical: 12,
  },
  'list-item': {
    fontSize: 15,
    lineHeight: 22,
    color: '#5f6368',
    marginBottom: 12,
    paddingLeft: 24,
  },
  
  // Button styles
  'primary-button': {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
};
```

### Supported HTML Elements

#### Text Elements
- `<h1>` to `<h6>`: Headings with different sizes
- `<p>`: Paragraphs with customizable styles
- `<span>`: Inline text with custom styling
- `<strong>`, `<b>`: Bold text
- `<em>`, `<i>`: Italic text

#### Lists
- `<ul>`: Unordered lists with bullet points
- `<ol>`: Ordered lists with numbers
- `<li>`: List items with custom styling

#### Interactive Elements
- `<button>`: Customizable buttons with action handling
- `<a>`: Links with custom styling and press handling

#### Containers
- `<div>`: Generic container for layout
- `<section>`: Semantic container for content sections

#### Media
- `<img>`: Images with various display options

### Event Handling

#### Button Events
```jsx
<HTMLRenderer
  onButtonPress={(text, attributes) => {
    const action = attributes['data-action'];
    const id = attributes['data-id'];
    
    switch (action) {
      case 'like':
        handleLike(id);
        break;
      case 'share':
        handleShare(id);
        break;
    }
  }}
/>
```

#### Link Events
```jsx
<HTMLRenderer
  onLinkPress={(url, text, attributes) => {
    const target = attributes.target;
    
    if (target === '_blank') {
      openInBrowser(url);
    } else {
      navigateToScreen(url);
    }
  }}
/>
```

### Image Handling

Images can be customized with various style properties:

```jsx
customStyles={{
  'article-image': {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 16,
  },
  'thumbnail': {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 40,
  }
}}
```

### List Styling

Customize both ordered and unordered lists:

```jsx
customStyles={{
  'ul': {
    marginLeft: 0,
    marginVertical: 12,
  },
  'ol': {
    marginLeft: 0,
    marginVertical: 12,
  },
  'li': {
    fontSize: 15,
    lineHeight: 22,
    color: '#5f6368',
    marginBottom: 12,
    paddingLeft: 24,
  }
}}
```

