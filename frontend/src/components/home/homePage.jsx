import React, { useState, useEffect } from 'react';
import './homePage.css';
import userIcon from '../assets/person.png';
import logo from '../assets/logo.png';

const Homepage = () => {
  const [showHindi, setShowHindi] = useState(true);
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    const mockBackendResponse = {
      user: {
        profilePic: "https://i.pravatar.cc/150?img=32" 
      },
      query: "As-salamu alaykum. I'm feeling a lot of anxiety and would like to find some comfort and guidance from the Quran on the topic of patience (Sabr). Where can I find relevant verses?",
      botResponse: {
        title: "Quranic Guidance on Patience (Sabr)",
        details: { surahName: "Al-Baqarah", surahNo: 2, ayatNo: 153 },
        arabic: {
          text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Basmala.svg/800px-Basmala.svg.png" 
        },
        translations: {
          english: "O you who believe! Seek help through patience and prayer. Allah is truly with those who are patient.",
          hindi: "ओ ईमान वालों! सब्र (धैर्य) और नमाज़ से मदद चाहो। बेशक अल्लाह सब्र करने वालों के साथ है।"
        },
        explanation: "This verse (2:153) reassures believers that Allah's presence and support are with those who cultivate patience and establish consistent prayer. These are essential spiritual tools for overcoming life's challenges."
      }
    };
    setChatData(mockBackendResponse);
  }, []);

  if (!chatData) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      <div className="main-container">
        
        {/* Header - Horizontal Line */}
        <header className="header">
          <button className="icon-btn">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div className="logo-container">
            <img src={logo} alt='userIcon'/>
          </div>

          <button className="icon-btn profile-btn">
            <img src={chatData.user.profilePic} alt="User Profile" className="profile-img" />
          </button>
        </header>

        {/* Chat Content Area */}
        <main className="chat-area">
          <div className="chat-content-wrapper">
            
            {/* User Message */}
            <div className="user-message">
              {chatData.query}
            </div>

            {/* Bot Response Container */}
            <div className="bot-response">
              <h3 className="response-title">{chatData.botResponse.title}</h3>

              <div className="info-card">
                <h4>Quranic Details:</h4>
                <p>Surah No: {chatData.botResponse.details.surahName} ({chatData.botResponse.details.surahNo})</p>
                <p>Ayat No: {chatData.botResponse.details.ayatNo}</p>
              </div>

              <div className="info-card">
                <h4>Ayat Arabic (Representative Calligraphy):</h4>
                <div className="arabic-container">
                  <img src={chatData.botResponse.arabic.imageUrl} alt="Arabic Ayat" className="ayat-image" />
                  <span className="arabic-text">{chatData.botResponse.arabic.text}</span>
                  <button className="audio-btn">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                  </button>
                </div>
              </div>

              <div className="info-card">
                <h4>Ayat English/Hindi Translation:</h4>
                <p className="translation-text">{chatData.botResponse.translations.english}</p>
                
                <div className="toggle-row">
                  <span className="toggle-label">Hindi</span>
                  <div className={`toggle-switch ${showHindi ? 'active' : ''}`} onClick={() => setShowHindi(!showHindi)}>
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                {showHindi && (
                  <p className="translation-text hindi-text">{chatData.botResponse.translations.hindi}</p>
                )}
              </div>

              <div className="info-card">
                <h4>Detailed Explanation:</h4>
                <p className="explanation-text">{chatData.botResponse.explanation}</p>
              </div>
              
              <div className="scroll-spacer"></div>
            </div>
          </div>
        </main>

        {/* Bottom Input Area */}
        <footer className="bottom-sheet">
          <div className="input-wrapper">
            <div className="sheet-header">
              <div className="sheet-icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 13H7a.996.996 0 0 1-.45-.11l.1-.11.02-.02.04-.05.07-.09.11-.16.14-.24a2.02 2.02 0 0 1 .47-.62c.16-.14.34-.25.54-.34A1.947 1.947 0 0 1 9 17h11V5h-9v8.28l-1.72-1.72a.996.996 0 0 0-1.41 0l-1.72 1.72V5H19v12z"></path></svg>
              </div>
              <h2>Quran Search & Exploration</h2>
            </div>

            <div className="input-container">
              <input type="text" placeholder="Ask another question..." />
              <button className="mic-btn">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </button>
              <button className="send-btn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
              </button>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Homepage;