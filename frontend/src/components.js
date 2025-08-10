import React, { useState, useRef, useEffect } from 'react';

// Mock data for tweets
const mockTweets = [
  {
    id: 1,
    user: {
      username: '@elonmusk',
      displayName: 'Elon Musk',
      avatar: 'https://images.pexels.com/photos/30004312/pexels-photo-30004312.jpeg',
      verified: true
    },
    content: 'Building the future of social media on X. Exciting times ahead! 🚀',
    timestamp: '2h',
    likes: 15420,
    retweets: 3240,
    replies: 890,
    views: 2100000,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 2,
    user: {
      username: '@sundarpichai',
      displayName: 'Sundar Pichai',
      avatar: 'https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg',
      verified: true
    },
    content: 'AI is transforming how we work, learn, and connect. The possibilities are endless when we build responsibly.',
    timestamp: '4h',
    likes: 8920,
    retweets: 2100,
    replies: 456,
    views: 1500000,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: 3,
    user: {
      username: '@satyanadella',
      displayName: 'Satya Nadella',
      avatar: 'https://images.unsplash.com/photo-1661747675288-814df576be9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJzfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1NDg1MDE4N3ww&ixlib=rb-4.1.0&q=85',
      verified: true
    },
    content: 'Every organization will be an AI organization. The question is how quickly you can adapt and innovate. #AI #Innovation',
    timestamp: '6h',
    likes: 12340,
    retweets: 2890,
    replies: 670,
    views: 1800000,
    isLiked: false,
    isRetweeted: true
  },
  {
    id: 4,
    user: {
      username: '@tim_cook',
      displayName: 'Tim Cook',
      avatar: 'https://images.pexels.com/photos/8916204/pexels-photo-8916204.jpeg',
      verified: true
    },
    content: 'Privacy is a fundamental human right. At Apple, we believe your data belongs to you, not us.',
    timestamp: '8h',
    likes: 18750,
    retweets: 4120,
    replies: 1200,
    views: 2800000,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 5,
    user: {
      username: '@jeffbezos',
      displayName: 'Jeff Bezos',
      avatar: 'https://images.pexels.com/photos/4389460/pexels-photo-4389460.jpeg',
      verified: true
    },
    content: 'Blue Origin\'s latest mission was a success! Another step towards making space accessible to everyone. 🌌',
    timestamp: '12h',
    likes: 9860,
    retweets: 1890,
    replies: 345,
    views: 1200000,
    isLiked: true,
    isRetweeted: false
  }
];

const mockTrending = [
  { topic: '#AI', posts: '2.1M posts' },
  { topic: '#Innovation', posts: '890K posts' },
  { topic: '#TechNews', posts: '1.2M posts' },
  { topic: '#Space', posts: '450K posts' },
  { topic: '#Privacy', posts: '670K posts' }
];

const mockSuggestions = [
  {
    username: '@openai',
    displayName: 'OpenAI',
    avatar: 'https://images.unsplash.com/photo-1646753090067-610360f94f9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxhdmF0YXJzfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1NDg1MDE4N3ww&ixlib=rb-4.1.0&q=85',
    verified: true
  },
  {
    username: '@google',
    displayName: 'Google',
    avatar: 'https://images.unsplash.com/photo-1651506992897-1e71060ad286?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxhdmF0YXJzfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1NDg1MDE4N3ww&ixlib=rb-4.1.0&q=85',
    verified: true
  }
];

// Header Component
const Header = ({ title }) => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">{title}</h1>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ currentUser, activeTab, setActiveTab, darkMode, toggleDarkMode }) => {
  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home', path: '/' },
    { id: 'explore', icon: '🔍', label: 'Explore', path: '/explore' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', path: '/notifications' },
    { id: 'messages', icon: '✉️', label: 'Messages', path: '/messages' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-x">𝕏</span>
        </div>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map(item => (
          <a 
            key={item.id}
            href={item.path}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.id);
              window.history.pushState({}, '', item.path);
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </a>
        ))}
      </div>

      <button className="tweet-button">
        Post
      </button>

      <div className="sidebar-footer">
        <div className="user-info">
          <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
          <div className="user-details">
            <div className="user-name">{currentUser.displayName}</div>
            <div className="user-username">{currentUser.username}</div>
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

// Tweet Composer Component
const TweetComposer = ({ currentUser }) => {
  const [tweetText, setTweetText] = useState('');
  const [charCount, setCharCount] = useState(280);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setTweetText(text);
      setCharCount(280 - text.length);
    }
  };

  const handleSubmit = () => {
    if (tweetText.trim()) {
      console.log('Tweet posted:', tweetText);
      setTweetText('');
      setCharCount(280);
    }
  };

  return (
    <div className="tweet-composer">
      <div className="composer-content">
        <img src={currentUser.avatar} alt="Profile" className="composer-avatar" />
        <div className="composer-input-area">
          <textarea
            ref={textareaRef}
            value={tweetText}
            onChange={handleTextChange}
            placeholder="What's happening?"
            className="composer-textarea"
            rows="3"
          />
          <div className="composer-actions">
            <div className="composer-tools">
              <button className="tool-button">📷</button>
              <button className="tool-button">🎥</button>
              <button className="tool-button">📊</button>
              <button className="tool-button">😊</button>
            </div>
            <div className="composer-submit">
              <span className={`char-count ${charCount < 20 ? 'warning' : ''}`}>
                {charCount}
              </span>
              <button 
                className="post-button"
                onClick={handleSubmit}
                disabled={!tweetText.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tweet Component
const Tweet = ({ tweet, currentUser }) => {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
  const [likes, setLikes] = useState(tweet.likes);
  const [retweets, setRetweets] = useState(tweet.retweets);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweets(isRetweeted ? retweets - 1 : retweets + 1);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <article className="tweet">
      <div className="tweet-header">
        <img src={tweet.user.avatar} alt="Profile" className="tweet-avatar" />
        <div className="tweet-user-info">
          <span className="tweet-display-name">
            {tweet.user.displayName}
            {tweet.user.verified && <span className="verified-badge">✓</span>}
          </span>
          <span className="tweet-username">{tweet.user.username}</span>
          <span className="tweet-timestamp">·</span>
          <span className="tweet-timestamp">{tweet.timestamp}</span>
        </div>
        <button className="tweet-menu">⋯</button>
      </div>

      <div className="tweet-content">
        {tweet.content}
      </div>

      <div className="tweet-actions">
        <button className="action-button reply">
          <span className="action-icon">💬</span>
          <span className="action-count">{formatNumber(tweet.replies)}</span>
        </button>
        
        <button 
          className={`action-button retweet ${isRetweeted ? 'active' : ''}`}
          onClick={handleRetweet}
        >
          <span className="action-icon">🔄</span>
          <span className="action-count">{formatNumber(retweets)}</span>
        </button>
        
        <button 
          className={`action-button like ${isLiked ? 'active' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="action-count">{formatNumber(likes)}</span>
        </button>
        
        <button className="action-button share">
          <span className="action-icon">📤</span>
        </button>

        <div className="tweet-views">
          <span className="views-count">{formatNumber(tweet.views)} views</span>
        </div>
      </div>
    </article>
  );
};

// Feed Component
const Feed = ({ currentUser }) => {
  const [tweets, setTweets] = useState(mockTweets);

  return (
    <div className="feed">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} currentUser={currentUser} />
      ))}
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input"
        />
      </div>

      <div className="trending-section">
        <h3 className="section-title">What's happening</h3>
        {mockTrending.map((trend, index) => (
          <div key={index} className="trending-item">
            <div className="trending-topic">{trend.topic}</div>
            <div className="trending-posts">{trend.posts}</div>
          </div>
        ))}
      </div>

      <div className="suggestions-section">
        <h3 className="section-title">Who to follow</h3>
        {mockSuggestions.map((user, index) => (
          <div key={index} className="suggestion-item">
            <img src={user.avatar} alt="Profile" className="suggestion-avatar" />
            <div className="suggestion-info">
              <div className="suggestion-name">
                {user.displayName}
                {user.verified && <span className="verified-badge">✓</span>}
              </div>
              <div className="suggestion-username">{user.username}</div>
            </div>
            <button className="follow-button">Follow</button>
          </div>
        ))}
      </div>
    </aside>
  );
};

// Profile Component
const Profile = ({ user, isOwnProfile }) => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img src={user.avatar} alt="Profile" className="profile-avatar" />
          <div className="profile-details">
            <h2 className="profile-name">
              {user.displayName}
              {user.verified && <span className="verified-badge">✓</span>}
            </h2>
            <p className="profile-username">{user.username}</p>
            <div className="profile-stats">
              <span className="stat">
                <strong>{user.following}</strong> Following
              </span>
              <span className="stat">
                <strong>{user.followers}</strong> Followers
              </span>
            </div>
          </div>
          {!isOwnProfile && (
            <button className="follow-button">Follow</button>
          )}
        </div>
      </div>
      <div className="profile-tweets">
        <Feed currentUser={user} />
      </div>
    </div>
  );
};

// Explore Component
const Explore = () => {
  return (
    <div className="explore">
      <div className="explore-tabs">
        <button className="tab active">For you</button>
        <button className="tab">Trending</button>
        <button className="tab">News</button>
        <button className="tab">Sports</button>
        <button className="tab">Entertainment</button>
      </div>
      <div className="explore-content">
        <Feed />
      </div>
    </div>
  );
};

// Notifications Component
const Notifications = ({ currentUser }) => {
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      user: { name: 'Elon Musk', username: '@elonmusk', avatar: 'https://images.pexels.com/photos/30004312/pexels-photo-30004312.jpeg' },
      message: 'liked your post',
      time: '2h'
    },
    {
      id: 2,
      type: 'follow',
      user: { name: 'Sundar Pichai', username: '@sundarpichai', avatar: 'https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg' },
      message: 'followed you',
      time: '4h'
    },
    {
      id: 3,
      type: 'retweet',
      user: { name: 'Satya Nadella', username: '@satyanadella', avatar: 'https://images.unsplash.com/photo-1661747675288-814df576be9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJzfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1NDg1MDE4N3ww&ixlib=rb-4.1.0&q=85' },
      message: 'retweeted your post',
      time: '6h'
    }
  ];

  return (
    <div className="notifications">
      {mockNotifications.map(notification => (
        <div key={notification.id} className="notification-item">
          <img src={notification.user.avatar} alt="Profile" className="notification-avatar" />
          <div className="notification-content">
            <span className="notification-text">
              <strong>{notification.user.name}</strong> {notification.message}
            </span>
            <span className="notification-time">{notification.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Messages Component
const Messages = ({ currentUser }) => {
  const mockMessages = [
    {
      id: 1,
      user: { name: 'Elon Musk', username: '@elonmusk', avatar: 'https://images.pexels.com/photos/30004312/pexels-photo-30004312.jpeg' },
      lastMessage: 'Hey, great post about AI!',
      time: '2h',
      unread: true
    },
    {
      id: 2,
      user: { name: 'Sundar Pichai', username: '@sundarpichai', avatar: 'https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg' },
      lastMessage: 'Thanks for the follow!',
      time: '1d',
      unread: false
    }
  ];

  return (
    <div className="messages">
      <div className="messages-header">
        <h2>Messages</h2>
      </div>
      <div className="messages-list">
        {mockMessages.map(message => (
          <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
            <img src={message.user.avatar} alt="Profile" className="message-avatar" />
            <div className="message-content">
              <div className="message-header">
                <span className="message-name">{message.user.name}</span>
                <span className="message-username">{message.user.username}</span>
                <span className="message-time">{message.time}</span>
              </div>
              <div className="message-text">{message.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Components = {
  Header,
  Sidebar,
  Feed,
  RightSidebar,
  TweetComposer,
  Tweet,
  Profile,
  Explore,
  Notifications,
  Messages
};

export default Components;