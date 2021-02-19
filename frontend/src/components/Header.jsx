import React from 'react';
import { IconLogo } from './Icons';

const Header = ({ userPosition }) => {
  return (
    <header className="header">
      <div>{IconLogo}</div>
      <div className="header-buttons">
        <div>button1</div>
        <div>button2</div>
      </div>
    </header>
  );
};

export default Header;
