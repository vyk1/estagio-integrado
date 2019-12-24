import axios from 'axios';

const api = axios.create({
    baseURL: "http://estagiointegrado.kinghost.net:21089",
    // baseURL: "http://18.218.253.191:8080",
    // baseURL: "http://192.168.111.126:4444",
});

export default api;