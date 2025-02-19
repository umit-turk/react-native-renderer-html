import React from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import HTMLRenderer from './src/HTMLRenderer';

const App = () => {
  const sampleHtml = `
    <div class="app-container">
      <div class="header">
        <span class="category-tag">Featured</span>
        <h1 class="main-title">The Renaissance of Artificial Intelligence</h1>
        <p class="subtitle">Where innovation meets elegance in the digital age</p>
      </div>

      <div class="featured-article">
        <img class="hero-image" src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg" alt="AI Technology" />
        <div class="article-meta">
          <span class="meta-item">Curated Content</span>
          <span class="meta-dot">•</span>
          <span class="meta-item">6 min read</span>
        </div>
        <h2 class="article-title">The Renaissance of Artificial Intelligence</h2>
        <p class="article-excerpt">Discover how AI is not just changing technology, but revolutionizing art, creativity, and human expression. Join us on a journey through the intersection of artificial intelligence and human ingenuity.</p>
        
        <div class="key-points">
          <h3 class="key-points-title">Key Highlights</h3>
          <ul>
            <li>AI-powered creative tools revolutionizing digital art and design</li>
            <li>Machine learning algorithms enhancing human creativity</li>
            <li>The future of collaborative AI-human artistic expression</li>
            <li>Impact of AI on various creative industries</li>
          </ul>
        </div>

        <div class="article-actions">
          <button class="primary-button" data-action="read">Explore Now</button>
          <button class="secondary-button" data-action="save">Save Story</button>
        </div>
      </div>

      <div class="topics-section">
        <h3 class="section-title">Trending Topics</h3>
        <div class="topic-grid">
          <div class="topic-card ai">
            <span class="topic-icon">✨</span>
            <h4 class="topic-title">Creative AI</h4>
            <p class="topic-desc">AI in art and design</p>
          </div>
          <div class="topic-card future">
            <span class="topic-icon">🌌</span>
            <h4 class="topic-title">Future Tech</h4>
            <p class="topic-desc">Tomorrow's innovations</p>
          </div>
          <div class="topic-card design">
            <span class="topic-icon">🎨</span>
            <h4 class="topic-title">UI/UX</h4>
            <p class="topic-desc">Design excellence</p>
          </div>
          <div class="topic-card innovation">
            <span class="topic-icon">💫</span>
            <h4 class="topic-title">Innovation</h4>
            <p class="topic-desc">Breaking boundaries</p>
          </div>
        </div>
      </div>

      <div class="latest-articles">
        <div class="section-header">
          <h3 class="section-title">Latest Stories</h3>
          <button class="view-all-button" data-action="view-all">Browse All</button>
        </div>
        
        <div class="article-list">
          <div class="article-card">
            <img class="article-image" src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg" alt="Article 1" />
            <div class="card-content">
              <span class="tag">Design Trends</span>
              <h4 class="card-title">The Evolution of Digital Aesthetics</h4>
              <p class="card-excerpt">Exploring the future of digital design and user experience</p>
              <a href="/article/design-trends" class="read-more">Read Story →</a>
            </div>
          </div>

          <div class="article-card">
            <img class="article-image" src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg" alt="Article 2" />
            <div class="card-content">
              <span class="tag">Innovation</span>
              <h4 class="card-title">Redefining User Interactions</h4>
              <p class="card-excerpt">New paradigms in human-computer interaction</p>
              <a href="/article/user-interactions" class="read-more">Read Story →</a>
            </div>
          </div>
        </div>
      </div>

      <div class="newsletter-section">
        <div class="newsletter-content">
          <h3 class="section-title">Join Our Journey</h3>
          <p class="newsletter-desc">Get weekly curated insights on technology and design</p>
          <button class="subscribe-button" data-action="subscribe">Subscribe Now</button>
        </div>
      </div>
    </div>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <HTMLRenderer
        html={sampleHtml}
        customStyles={{
          'app-container': {
            padding: 16,
            backgroundColor: '#0A0A0A',
          },
          'header': {
            marginBottom: 32,
            paddingHorizontal: 0,
          },
          'category-tag': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            color: '#E5B8F4',
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 16,
            alignSelf: 'flex-start',
          },
          'main-title': {
            fontSize: 32,
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: 12,
            letterSpacing: -0.5,
            lineHeight: 40,
            paddingHorizontal: 0,
            textAlign: 'left',
          },
          'subtitle': {
            fontSize: 16,
            color: '#A5A5A5',
            lineHeight: 24,
            paddingHorizontal: 0,
            textAlign: 'left',
          },
          'hero-image': {
            width: '100%',
            height: 200,
            borderRadius: 16,
            marginVertical: 16,
            resizeMode: 'cover',
            margin: 0,
            padding: 0,
          },
          'article-meta': {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            paddingHorizontal: 0,
          },
          'meta-item': {
            color: '#C8A2C8',
            fontSize: 14,
            fontWeight: '500',
          },
          'meta-dot': {
            color: '#4A4A4A',
            marginHorizontal: 8,
          },
          'article-title': {
            fontSize: 24,
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: 12,
            lineHeight: 32,
            paddingHorizontal: 0,
          },
          'article-excerpt': {
            fontSize: 15,
            color: '#A5A5A5',
            lineHeight: 22,
            marginBottom: 24,
            paddingHorizontal: 0,
            textAlign: 'left',
          },
          'key-points': {
            marginVertical: 20,
            paddingHorizontal: 0,
          },
          'key-points-title': {
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 16,
            paddingHorizontal: 0,
          },
          'ul': {
            marginLeft: 0,
            marginBottom: 20,
          },
          'li': {
            fontSize: 15,
            color: '#A5A5A5',
            lineHeight: 22,
            marginBottom: 12,
            paddingLeft: 24,
            position: 'relative',
          },
          'article-actions': {
            flexDirection: 'row',
            gap: 12,
            marginBottom: 32,
            paddingHorizontal: 0,
          },
          'primary-button': {
            backgroundColor: '#E5B8F4',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            color: '#0A0A0A',
            fontSize: 15,
            fontWeight: '600',
          },
          'secondary-button': {
            backgroundColor: 'rgba(229, 184, 244, 0.1)',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            color: '#E5B8F4',
            fontSize: 15,
            fontWeight: '600',
          },
          'section-title': {
            fontSize: 24,
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: 24,
            paddingHorizontal: 8,
          },
          'topic-grid': {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 32,
            paddingHorizontal: 8,
          },
          'topic-card': {
            backgroundColor: 'rgba(229, 184, 244, 0.05)',
            borderRadius: 16,
            padding: 16,
            width: '47%',
            borderWidth: 1,
            borderColor: 'rgba(229, 184, 244, 0.1)',
          },
          'topic-icon': {
            fontSize: 32,
            marginBottom: 12,
          },
          'topic-title': {
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 6,
          },
          'topic-desc': {
            fontSize: 14,
            color: '#A5A5A5',
            lineHeight: 20,
          },
          'section-header': {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            paddingHorizontal: 8,
          },
          'view-all-button': {
            color: '#E5B8F4',
            fontSize: 15,
            fontWeight: '500',
          },
          'article-list': {
            gap: 24,
            marginBottom: 32,
            paddingHorizontal: 8,
          },
          'article-card': {
            backgroundColor: 'rgba(229, 184, 244, 0.05)',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(229, 184, 244, 0.1)',
            width: '100%',
          },
          'article-image': {
            width: '100%',
            height: 180,
            resizeMode: 'cover',
            margin: 0,
            padding: 0,
          },
          'card-content': {
            padding: 16,
            paddingHorizontal: 16,
          },
          'tag': {
            color: '#E5B8F4',
            fontSize: 13,
            fontWeight: '600',
            marginBottom: 8,
            paddingHorizontal: 0,
          },
          'card-title': {
            fontSize: 20,
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: 8,
            lineHeight: 28,
            paddingHorizontal: 0,
          },
          'card-excerpt': {
            fontSize: 14,
            color: '#A5A5A5',
            lineHeight: 20,
            marginBottom: 16,
            paddingHorizontal: 0,
          },
          'read-more': {
            color: '#E5B8F4',
            fontSize: 15,
            fontWeight: '600',
          },
          'newsletter-section': {
            backgroundColor: 'rgba(229, 184, 244, 0.1)',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            textAlign: 'center',
            marginHorizontal: 8,
          },
          'newsletter-content': {
            alignItems: 'center',
          },
          'newsletter-desc': {
            color: '#A5A5A5',
            fontSize: 17,
            marginBottom: 32,
            textAlign: 'center',
          },
          'subscribe-button': {
            backgroundColor: '#E5B8F4',
            paddingVertical: 16,
            paddingHorizontal: 40,
            borderRadius: 16,
            color: '#0A0A0A',
            fontSize: 16,
            fontWeight: '600',
          },
        }}
        onLinkPress={(url, text, attributes) => {
          Alert.alert('Link Pressed', `Opening: ${url}`);
        }}
        onButtonPress={(text, attributes) => {
          const action = attributes['data-action'];
          Alert.alert('Button Pressed', `Action: ${action}`);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});

export default App; 