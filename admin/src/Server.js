import axios from 'axios';

const api = axios.create({
    baseURL: "http://estagiointegrado.kinghost.net:21089",
    // baseURL: "http://192.168.0.105:21089",
});

export default api;