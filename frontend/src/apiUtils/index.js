import axios from 'axios';

export const getRequest = (url, data) =>
  axios.get(url, {
    params: {
      latitude: data[0],
      longitude: data[1],
    },
  });

export default getRequest;
