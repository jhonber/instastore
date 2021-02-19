import React from 'react';
import { IconLogo } from './Icons';

const Header = ({ userPosition, setUserPosition }) => {
  return (
    <header className="header">
      <div>{IconLogo}</div>
      <div className="header-buttons">
        <button onClick={() => setUserPosition(null)}>
          Get location again
        </button>
      </div>
    </header>
  );
};

export default Header;
