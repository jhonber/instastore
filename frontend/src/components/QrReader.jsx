import QrcodeDecoder from 'qrcode-decoder';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const QrReader = ({ handleQr, handleQrError, style }) => {
  const [src, setSrc] = useState(null);
  const [done, setDone] = useState(false);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (src) {
      const img = document.getElementById('qrcode');
      const qr = new QrcodeDecoder();
      qr.decodeFromImage(img)
        .then(({ data }) => {
          if (data) {
            setDone(true);
            handleQr(data);
          }
        })
        .catch((err) => {
          handleQrError(err);
        });
    }
  }, [src, handleQr, handleQrError]);

  useEffect(() => {
    // Take screenshot every 300 ms
    const timer = setInterval(() => !done && capture(), 300);
    return () => clearInterval(timer);
  });

  if (done) return null;

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        height={720}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: 'environment',
        }}
        style={style}
      />

      <img
        id="qrcode"
        src={src || ''}
        alt="Screenshot"
        style={{ height: '250px', width: '250px', display: 'none' }}
      />
    </>
  );
};

export default QrReader;
