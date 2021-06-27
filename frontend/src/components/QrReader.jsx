import { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  const [src, setSrc] = useState(null);
  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: 'user',
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef]);

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
        <img src={src} alt="Screenshot" />
      </div>
    </>
  );
};

export default WebcamComponent;
