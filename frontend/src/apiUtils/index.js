import axios from 'axios';

export const getRequest = (url, data) =>
  axios
    .get(url, {
      params: {
        latitude: data[0],
        longitude: data[1],
      },
    })
    .catch((error) => Promise.reject(error.response));

export default getRequest;
