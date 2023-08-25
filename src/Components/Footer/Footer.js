import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
        <span>United States</span>
        <nav className='first-part'>
          <ul className='footer-ul'>
            <li>Español (México)</li>
            <li>العربية</li>
            <li>Pyeckun</li>
            <li>简体中文</li>
            <li>Français (France)</li>
            <li>한국어</li>
            <li>Portugues (Brazil)</li>
            <li>Tiếng Việt</li>
            <li>繁體中文 (台灣)</li>
          </ul>
        </nav>
        <div className='second-part'>
          <span>Copyright © 2023 Apple Inc. All rights reserved.</span>
        </div>
        <div className='last-part'>
        <nav  className='first-part'>
          <ul className='footer-ul'>
            <li>Internet Service Terms</li>
            <li>Apple Music & Privacy</li>
            <li>Cookie Warning</li>
            <li>Support</li>
            <li>Feedback</li>
          </ul>
        </nav>
        </div>
      </div>
  )
}

export default Footer

