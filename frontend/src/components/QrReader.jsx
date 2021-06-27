import { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import QrcodeDecoder from 'qrcode-decoder';

const WebcamComponent = () => {
  const [src, setSrc] = useState(null);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);
  const [pause, setPause] = useState(false);
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

  useEffect(() => {
    if (src) {
      console.log('src: ', src);
      const img = document.getElementById('qrcode');
      var qr = new QrcodeDecoder();
      qr.decodeFromImage(img)
        .then(({ data }) => {
          setResult(data);
          setPause(true);
          console.log('RES: ', data);
        })
        .catch((err) => {
          setErr(err);
          console.log('ERROR: ', err);
        });
    }
  }, [src]);

  useEffect(() => {
    // Take screenshot every 100 ms
    const timer = setTimeout(() => !pause && capture(), 100);
    return clearTimeout(timer);
  });

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
      <div>
        <img
          id="qrcode"
          src={src}
          alt="Screenshot"
          style={{ height: '250px', width: '250px' }}
        />
        <p>Result: {result}</p>
        <p>Error: {err}</p>
      </div>
    </>
  );
};

export default WebcamComponent;
