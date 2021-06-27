import React, { useState, useRef } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';
// import { useTorchLight } from "@blackbox-vision/use-torch-light";

export default function App() {
  const streamRef = useRef(null);
  const [show, setShow] = useState(true);
  const [data, setData] = useState('NULL');

  console.info(streamRef.current);

  // const [on, toggle] = useTorchLight(streamRef.current, {
  //   debug: true,
  //   vibrate: 200
  // });

  return (
    <div className="App">
      <button onClick={() => setShow(!show)} style={{ marginBottom: 16 }}>
        {show ? 'Unmount QR Reader' : 'Mount QR Reader'}
      </button>
      {show && (
        <QrReader
          resolution={600}
          facingMode="environment"
          onLoad={({ stream }) => (streamRef.current = stream)}
          onScan={(decoded) => setData(decoded)}
          onError={(err) => console.info(err)}
        />
      )}

      <div>
        <p>
          El valor del QR es:{' '}
          {typeof data === 'object' ? JSON.stringify(data) : data}
        </p>
      </div>
    </div>
  );
}
