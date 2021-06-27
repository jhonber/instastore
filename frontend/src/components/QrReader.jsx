import { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import QrcodeDecoder from 'qrcode-decoder';

const WebcamComponent = () => {
  const [src, setSrc] = useState(null);
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

  useEffect(() => {
    if (src) {
      console.log('src: ', src);
      const img = document.getElementById('qrcode');
      // img.src =
      //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAAHjs1qAAAABmJLR0QA/wD/AP+gvaeTAAAD5ElEQVR4nO3dS24bMRBAwUyQ+1/ZOcFAHoEUSb2qtWF98NCLFsG5fn5+/kDD39VvAD5H7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTsh/xa+9nVdC1/990Y9aXnU5717P7Xv8w2mOyFyJ0TuhMidELkTIndC5E7Iyr37nVV72ad761P26Kd8nx9guhMid0LkTojcCZE7IXInRO6E7Lh3v7PbHvrp/7l7/6v207t9nx9guhMid0LkTojcCZE7IXInRO6EnLR3383TvfWoPT1vM90JkTshcidE7oTInRC5EyJ3Quzd33f6PetBpjshcidE7oTInRC5EyJ3QuROyEl7993uM7nbr4861z778+72fX6A6U6I3AmROyFyJ0TuhMidELkTsuPe/VvPiz/dr8/e6weZ7oTInRC5EyJ3QuROiNwJkTshV/DQ82yrzq/zkulOiNwJkTshcidE7oTInRC5E7LyvPuqc9iz72Wffc/M6X+/kOlOiNwJkTshcidE7oTInRC5E7LjefdRe987s+9p2W2vf2e33z0+wHQnRO6EyJ0QuRMid0LkTojcCSmed78z+/2M2veP+h1g1e8PC5nuhMidELkTIndC5E6I3AmROyE7Pld11XNGZ58jX3Ve/85B98OMYroTIndC5E6I3AmROyFyJ0TuhOx4z8xTp+y5n5r9ue588V7fdCdE7oTInRC5EyJ3QuROiNwJ+Ya9+yqr7pXf7X76gxIy3QmROyFyJ0TuhMidELkTIndC3O/+2uy98qhz7aPucX/qoH286U6I3AmROyFyJ0TuhMidELkTctL97rOdcn599nn3L2a6EyJ3QuROiNwJkTshcidE7oTsuHe/8633l686L37682vfYLoTIndC5E6I3AmROyFyJ0TuhJy0dz/d0z337N8Znv7/3e63eYPpTojcCZE7IXInRO6EyJ0QuRNi7z7equeYen7qS6Y7IXInRO6EyJ0QuRMid0LkTshJe/dT9r6zz7WPOgc/+7z7hkx3QuROiNwJkTshcidE7oTInZAd9+6nPwf09HPnX3CP+x3TnRC5EyJ3QuROiNwJkTshcifk2nA5CpOY7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcifkP9unARQLbXk4AAAAAElFTkSuQmCC';
      //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAANaklEQVR4Xu2d0XbbSAxDm///6OzJ+jRxFVuaS4Ea2bp9pigOCBAcJW0/Pj8/P//4RwRE4CECHwpEZojAcwQUiOwQgRUEFIj0EAEFIgdEoIaADlLDzacugoACuUijPWYNAQVSw82nLoKAArlIoz1mDQEFUsPNpy6CgAK5SKM9Zg0BBVLDzacugoACuUijPWYNgZJAPj4+am87+Cn6e5jPzpXKQ49P3/ssf+pcND89b3d8BU8FcteVFJFSA6TS0EckS51LgQxKOEWAwdeVwyjBUkRK4UPrpwTuzl9uXNODlfPqIDrIbjqmBsLuQjYSKJAFQBQQHaRGUQWywO1dAVEgCmSJQHTFohO71o7fT6WITXf4VP3PcKPnSg0u2kdaZwo32i96rq/8CmSgWyniPXuVAhloAghJClaBDACvQNZBShJyoB2bIcl6FMgm3H/+KBAFMkCTn5CkQtGLnwR316NAFAjiaTchUTFfF6knv/pSuZQ9ercCUSCIk5SQKYK9ymWW4oPADw6EVJ00z9n4sIb/IXeQswFytnoUCEXgFp8amApkgYACuQFCJ/8zItE8r4S/DlIbXodNMHInoncuSmwFMkgWCuzZJsbZ6hmE/TuM4p8idirPK+Gvg1B23sUfsQPrIM8bdAT+lxQInYRUQ7Rxs/LTlYzidjYcKudVIHddn2X9CoQi4Fesh4jRiUQnhgKpEZXeiWbhTPnw/5e+yn+g866AzGocpSUdFM/yVwiTuBPNwrlyXgXiikX1+Sv+XQemDrJo9azJRhmqg3gHmXIHSX2loXmoQOjKRCc8rYfmnzWIXLEWna0AktixFUhtwlNhUiet8ME7yEBX6IRUIAoksgINcPOfkCMmhg5Cu8J/6dEV6ySX34qlKhAFco+AK9YAH1yx1kGi+OggA6RLhtAG0TtCtxMlsejMNWvFpWdK8eHrvYc4CD0gjU8BkspDBUjPOytegQwi302kwTK+w1L1pPIokPWvWLS/ND7ZRx3kDv0ksOSyTwkwK14HGUS+m0iDZeggFKid8QpkEEAFMgjUIiz19ab29v1PKZBBDF+l0amG0oFg/CCRDg6rfI2M3kEOPu/m6xTIDaJZgt1s0MEBCmQBuAJRIPeUUCAK5OFM1kHqn51dse4opeNkHefgDWrzdTqIDqKDrMjkMIFsSvXkAamvcNRxZsFC66wQadbZut9bWrG6i+rOr0Bqq1R3X86YX4Hs6AqdzDtetetRWqcO8gO3AtlBPUq8Ha/a9SitU4EokF2E+/swJV7kpYUktE4FokAKNPv9CCVe5KWFJLROBbJTIO96yaVEesbVboKl8C9oDT2SwoH+oBMVuRFcuoOkGpQiZAqQVD0pYjw7Vwr/FG7dg0KBLBCeRQAFkpVMalAoEAWCmDlrgKAiV/4XWppHgSgQxBkFcoMr5VBr4HsHuUPHFQvpdDM4ReCXc5Duy2MK2M0ODgbQiU2FRuMHy/4OS+Wf1ZcU/hS3r/iSgyiQdagpIWk8bXQqvwKhyDfdHWY1IiV8SkgaT9uUyj+rLzrIouOzGqFAas5IBUvjFYgCecgZSoxnxNNBqCR/4r2DDGBHiUoJSeMHSv4nJJV/lrOn8Ke4xS/pdEWhgFOgUhOV1kkbQT9jdsfTPtLzzoqv9DHqIBRYWrACuSGsQGoSo3zTQQa/wlWAJS3sJjzNTwcdOevM2EofdZC7jqWIRElA39sdr0CaLukUWKpoVyxXLDp87uMp31yxXLEQ31IDCr00GHyYQKjF0zPSRsz6jElxoOfq/gqXqp/in4qnvKrEl+4gFFhaGCUSBZwSL7U60nPROmlfXj2e8qoSr0DuUKMWnCIYbRwdCO8aT3GrxCsQBfKLN68iqArh6TMKRIEokBXVKBAFokDSAum+tM66C9D3pnCgeejlHa8VHx/0kYfxqVWNFkPvhmv5Sw5CG9oNFAWExs9qEP3q1S1wikN331M8VCALBBTIOtWpMKmjvQr+X+fSQXbcQbonGCWqDnLrSFKACkSB/NI5FaYOMrh8UuXS+NTETr03VQ/NQwk52L7vMAXyg1jJQSiA1PpT+VN5UgSmxKb1UyGk4ml/KZ6zLvvlOwhtHAUwlT+VhzaUEo8SgObvjqf9pXhSfFL1KJBFpyiwVIA6yLpU6epL4yuDwhVrxyVdgdzAo4NFBzl4MlMLppOcNpROqlT99L2peAWyQJJOTgpgKn8qjwJZlxLtL8WTDpBUPeU7SOqAdIKlCJ/aXWk9s5yLEobiMyue8ofioEAOXgUVyA2BlKAUSNNqRxtEHbO7cdS56OSk+MyK78ZZB9FBHnJsFuHpXUOB6CCIwN0rHCVwd7wCUSAKZOXO8jYCoZONWjwFatYOT+s8Wzy9y3TX382Tw+4gCqSbKsfkVyA7cU5N5u7JkKqz++vWznbEH1cgOyFNEU+B7GxE0+MKZCewCuQGIMVhJ+yHPa5AdkJNiZH6DEjLTtXpikWRz8Z3bxqHXdKpEGZd6qlwaJ1ZepwnGyVqN860njUkS38fhE5OBXIeMndUQgmpQBZdUCAdtDxPTgUy2ItuoKjQ6KWye7INwvhyYd19p6ssrccVa5ByCmQQqEUYJWQ3zrQeBTLY9+7GDZbxcmGUkN0403reXiCpjwY0T7f1UyLNWikpDhRnulqn6nmbz7wpwGke2gg62RTIDWEFMrhUpCZkKo8CWW9cCmcFokAeIqCD6CCD0lgHiq5Gqcmmg+ggiMCvsmMrkFtbqUMhMhT+xcWz8ad8ST/bQVKNpsKhhEnFp/Cnu313PHXk7s1BgSwQViDrzqJABkdcaoJ1T4zB43yHKRAFsuRM6bd5FQiVXjY+hX+3I9D83QOzMgAVyF1XKgBmqT+WTYGs40TxWcumQBTIL35QgqXi38ZBur8e0K9S3VY+qx5KmFl1UvxfxanLX7EUyLrFU8KMLVY/Uan8s/IokJ2fT19lEnZP+O78CmR7NJXuIDqIDnKPABWaDqKDPFQQdUYdZHvCd0foIANfsSix6USlTU7ln5Xn7R2EftajBKArXGrSphpHBTWr/lSdqf5Swab6Nf3nICkAaUNnAU7rVCA3BGb1S4EsEOh2QAVSG4kKpIbb91OUeLMAp3XqIDrITmncHqfEUyDrsFM8I01cSTKrX65YrlgPOaBAtiUf/cy7/bpzRNA7SDeRUl9jXr1O6iB0Na2wT4HcoZZqEG2EAqndQRQIZdpgvA4yCNQirFvIqQGVqvP/e+9nMlsN98OfUiA1yFNU6cY/VacCGZyQr77b1+Tw+6kU8RRIqiNNebobRMvuJh6tp3u378Y/hWfZQbonandDZ9VPd+xUPMUzRWBaPxUm7WNFOKU7CC2MNigVn2rQrHpo/RUCPDqbAvlBRYGk2D+QJ0V4SuCB0v4JoflT8ToI7dTOeErIna/bfJzWk4rfLGwRkCI8rV+B0E7tjE81aGcZ34/TelLxtH4F4opFOROJTxGeEpgWT/On4t/eQVKXxLM1NFUPzUMFRQn2LJ4Snp4rlZ9+LKrwM3pJrxRAwZ3x1YXWSBtHiU3z076kCNwtwG4cvupXIHddpESiBKBC00HWEVMgg4yiE4/GD5bxHUYbp4PcEKADiuJM8+sgC2ZWACQrHxWaDqKDUM48jKeOQONpkXSy6SAXd5BZhOmewCmhdeMzS+D0vbRfKcdfq/OQS3o3AShRaT3djaP1UMehRE3VQ9/bjTOt57A7SArwFIC0ntR7Z331osSg+ND8VOB0AKbqUSCDSCqQQaB2hnXjXCnPFWsAte7GpSZ2aidP1TMA7T8h3TjTenSQQcS6G5cipAIZbCgIu6SDAHxWQ7t3YyqcboHQ/Kn6aR56x/ErVkoRizwKZB1YSmzq1LStVOCXXbEosPTrU6URj96RIhg9b0r4qfppHh3k4EmuQG4IUOFTYusgdJQt4imAtKG0vNSkpQJMTkjiXBRPBbKTwJSQCmQdMUpgKkyaX4G8qEDo5Kfx3cSjgyVF1NS5aD3UMVP9uuwlnQJI41NEokKg76XEo/mp49Pz0vzUARXITgekgKeERolEJ3b3uWg9VMhJnC/5g0IKII1PTVoqBPpeSjyan054el6anwpfB9FBHnKSEokOEB1kAfvZAEk1tJtIdKLSCa+DbCN8yIq1Xca+iHclfPe5uvPv6+r207T+7Yy/IxTIHSZncwRKgLPFVwhJnqHnJbn/xioQBfKLN0dcfitkXT6jQAZRpEDReLrbUydK5afn6o4fbF85jNZfeZEOooPoICvKUSAKRIEcJZCKhXU+Q3fpWZ896YrVXSftSTfO3T8mWDtv1EEosN3x3Y2jxKZ3E0qM7vxUmKn6aR5apwJZIEABTxEvlSdFAIoDfS/NnxpotE4FokAecoASmBKP5lcg3TvVIn8K8NTkT+WhRKWrIG1TN85UaCl8vvJ4BxlgQ4rYqTwpAnQTj+ZPCS2FT1kgA5wyRATeAoGSg7zFyT2ECAwgoEAGQDLkuggokOv23pMPIKBABkAy5LoIKJDr9t6TDyCgQAZAMuS6CCiQ6/bekw8goEAGQDLkuggokOv23pMPIKBABkAy5LoIKJDr9t6TDyCgQAZAMuS6CPwHxF+Et/60BlAAAAAASUVORK5CYII=';

      // function getBase64Image(img) {
      //   var canvas = document.createElement('canvas');
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   var ctx = canvas.getContext('2d');
      //   ctx.drawImage(img, 0, 0);
      //   var dataURL = canvas.toDataURL('image/png');
      //   return dataURL;
      // }

      // var base64 = getBase64Image(img);

      // img.src = base64;

      // console.log('img: ', img);
      var qr = new QrcodeDecoder();
      qr.decodeFromImage(img)
        .then(({ data }) => {
          setResult(data);
          console.log('RES: ', data);
        })
        .catch((err) => {
          setErr(err);
          console.log('ERROR: ', err);
        });
      // QRScanner.scanImage(src)
      //   .then((result) => setResult(result))
      //   .catch((err) => setErr(err || 'Not QR code found'));
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
