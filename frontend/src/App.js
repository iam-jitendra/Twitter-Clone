import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './components';

const { 
  Header, 
  Sidebar, 
  Feed, 
  RightSidebar, 
  TweetComposer, 
  Profile,
  Explore,
  Notifications,
  Messages 
} = Components;

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: '@johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxhdmF0YXJzfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1NDg1MDE4N3ww&ixlib=rb-4.1.0&q=85',
    followers: 1234,
    following: 567,
    verified: true
  });

  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <BrowserRouter>
        <div className="app-container">
          <Sidebar 
            currentUser={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <>
                  <Header title="Home" />
                  <TweetComposer currentUser={currentUser} />
                  <Feed currentUser={currentUser} />
                </>
              } />
              <Route path="/explore" element={
                <>
                  <Header title="Explore" />
                  <Explore />
                </>
              } />
              <Route path="/notifications" element={
                <>
                  <Header title="Notifications" />
                  <Notifications currentUser={currentUser} />
                </>
              } />
              <Route path="/messages" element={
                <>
                  <Header title="Messages" />
                  <Messages currentUser={currentUser} />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <Profile user={currentUser} isOwnProfile={true} />
                </>
              } />
            </Routes>
          </main>

          <RightSidebar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;