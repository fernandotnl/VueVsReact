import axios from 'axios';

var instance = axios.create({
  baseURL: 'https://stocktrade-ccd74.firebaseio.com/'
});

export default instance;