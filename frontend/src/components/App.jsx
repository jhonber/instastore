import React from 'react';

import QrReader from './QrReader';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <QrReader
        style={{
          border: 'solid 1px',
          width: '90%',
          height: '20vh',
          maxHeight: '300px',
        }}
        handleQr={(data) => alert(data)}
      />
    </div>
  );
};

export default App;
