import L from 'leaflet';

const createIcon = (srcImg) => {
  return new L.Icon({
    iconUrl: srcImg,
    iconRetinaUrl: srcImg,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
  });
};

export const IconHouse = createIcon('/images/house.png');
export const IconStore = createIcon('/images/shop.png');

export const IconLogo = (
  <svg viewBox="0 0 64 64" width="55" height="55">
    <g id="Tracking">
      <path
        d="M45,37a1,1,0,0,1-1-1V27a1,1,0,0,1,1-1h7l-3.41-3.41A2.006,2.006,0,0,0,47.17,22H11V46a2.006,2.006,0,0,0,2,2H59a2.006,2.006,0,0,0,2-2V37Z"
        style={{ fill: '#3d9ae2' }}
      />
      <path
        d="M27,22A12,12,0,0,1,15,34a11.8,11.8,0,0,1-4-.69A12,12,0,1,1,27,22Z"
        style={{ fill: '#ffd422' }}
      />
      <path
        d="M21,20c0,4-6,10-6,10S9,24,9,20a6,6,0,0,1,12,0Z"
        style={{ fill: '#ff6243' }}
      />
      <circle cx="15" cy="20" r="2" style={{ fill: '#ffa733' }} />
      <path
        d="M61,35v2H45a1,1,0,0,1-1-1V27a1,1,0,0,1,1-1h7Z"
        style={{ fill: '#e6e7e8' }}
      />
      <path
        d="M11,39H61a0,0,0,0,1,0,0v7a2,2,0,0,1-2,2H13a2,2,0,0,1-2-2V39A0,0,0,0,1,11,39Z"
        style={{ fill: '#78b9eb' }}
      />
      <circle cx="22" cy="48" r="6" style={{ fill: '#787680' }} />
      <circle cx="50" cy="48" r="6" style={{ fill: '#787680' }} />
      <path d="M61.707,34.293,49.293,21.879A2.978,2.978,0,0,0,47.171,21H30v2h5V38h2V23H47.171a1,1,0,0,1,.708.293L49.586,25H45a2,2,0,0,0-2,2v9a2,2,0,0,0,2,2H60v8a1,1,0,0,1-1,1H56.92a6.991,6.991,0,0,0-13.84,0H28.92a6.991,6.991,0,0,0-13.84,0H13a1,1,0,0,1-1-1V37H10v9a3,3,0,0,0,3,3h2.08a6.978,6.978,0,0,0,2.031,4H2v2H50a7.006,7.006,0,0,0,6.92-6H59a3,3,0,0,0,3-3V35A1,1,0,0,0,61.707,34.293ZM17,48a5,5,0,1,1,5,5A5.006,5.006,0,0,1,17,48Zm9.889,5a6.978,6.978,0,0,0,2.031-4H43.08a6.978,6.978,0,0,0,2.031,4ZM50,53a5,5,0,1,1,5-5A5.006,5.006,0,0,1,50,53ZM45,36V27h6.586L60,35.414V36Z" />
      <rect x="21" y="47" width="2" height="2" />
      <rect x="49" y="47" width="2" height="2" />
      <rect x="2" y="44" width="5" height="2" />
      <rect x="4" y="40" width="3" height="2" />
      <rect x="5" y="36" width="2" height="2" />
      <path d="M15,35A13,13,0,1,0,2,22,13.015,13.015,0,0,0,15,35Zm0-24A11,11,0,1,1,4,22,11.013,11.013,0,0,1,15,11Z" />
      <path d="M15,31a1,1,0,0,0,.707-.293C16.351,30.063,22,24.29,22,20A7,7,0,0,0,8,20c0,4.29,5.649,10.063,6.293,10.707A1,1,0,0,0,15,31Zm0-16a5.006,5.006,0,0,1,5,5c0,2.566-3.147,6.531-5,8.551-1.853-2.02-5-5.985-5-8.551A5.006,5.006,0,0,1,15,15Z" />
      <path d="M18,20a3,3,0,1,0-3,3A3,3,0,0,0,18,20Zm-4,0a1,1,0,1,1,1,1A1,1,0,0,1,14,20Z" />
      <rect x="40" y="40" width="4" height="2" />
    </g>
  </svg>
);

export default IconHouse;
