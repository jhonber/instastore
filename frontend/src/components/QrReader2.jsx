import QrScanner from 'qr-scanner';
import { useEffect } from 'react';

const WebcamComponent = () => {
  const video = document.getElementById('qr-video');
  const camHasFlash = document.getElementById('cam-has-flash');
  const flashToggle = document.getElementById('flash-toggle');
  const flashState = document.getElementById('flash-state');
  const camQrResult = document.getElementById('cam-qr-result');
  const camQrResultTimestamp = document.getElementById(
    'cam-qr-result-timestamp'
  );

  useEffect(() => {
    if (!video) return;

    function setResult(label, result) {
      label.textContent = result;
      camQrResultTimestamp.textContent = new Date().toString();
      label.style.color = 'teal';
      clearTimeout(label.highlightTimeout);
      label.highlightTimeout = setTimeout(
        () => (label.style.color = 'inherit'),
        100
      );
    }

    const scanner = new QrScanner(
      video,
      (result) => setResult(camQrResult, result),
      (error) => {
        camQrResult.textContent = error;
        camQrResult.style.color = 'inherit';
      }
    );
    scanner.start().then(() => {
      scanner.hasFlash().then((hasFlash) => {
        camHasFlash.textContent = hasFlash;
        if (hasFlash) {
          flashToggle.style.display = 'inline-block';
          flashToggle.addEventListener('click', () => {
            scanner
              .toggleFlash()
              .then(
                () =>
                  (flashState.textContent = scanner.isFlashOn() ? 'on' : 'off')
              );
          });
        }
      });
    });
  }, [
    camQrResult,
    camQrResultTimestamp,
    video,
    camHasFlash,
    flashState,
    flashToggle,
  ]);

  return (
    <>
      <video id="qr-video"></video>
      <b>Detected QR code: </b>
      <span id="cam-qr-result">None</span>
      <b>Last detected at: </b>
      <span id="cam-qr-result-timestamp"></span>
    </>
  );
};

export default WebcamComponent;
