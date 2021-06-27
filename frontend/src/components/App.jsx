import React from 'react';

import QrReader from './QrReader';

const App = () => {
  return (
    // <div className="App">
    <QrReader
      style={{ border: 'solid 1px' }}
      handleQr={(data) => alert(data)}
    />
    // </div>
  );
};

export default App;
