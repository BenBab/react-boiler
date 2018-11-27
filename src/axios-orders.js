import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-boiler-5ecbd.firebaseio.com/'
});

export default instance;