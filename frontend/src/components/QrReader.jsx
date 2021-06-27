import { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import QRScanner from 'qr-scanner';

const WebcamComponent = () => {
  const [src, setSrc] = useState(
    'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=It%20works!'
  );
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);
  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: 'environment',
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef]);

  // const scanner = new QRScanner();

  useEffect(() => {
    if (src) {
      QRScanner.scanImage(src)
        .then((result) => setResult(result))
        .catch((err) => setErr(err || 'Not QR code found'));
    }
  }, [src]);

  return (
    <>
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <div>
        <img id="qrcode" src={src} alt="Screenshot" />
        <p>Result: {result}</p>
        <p>Error: {err}</p>
      </div>
    </>
  );
};

export default WebcamComponent;
