import React from 'react';
import { IconLogo } from './Icons';

const Header = ({ userPosition }) => {
  return (
    <header className="header">
      <div>{IconLogo}</div>
      <div className="header-buttons">
        <button>Get location</button>
        <button className="center-button">Center map</button>
      </div>
    </header>
  );
};

export default Header;
