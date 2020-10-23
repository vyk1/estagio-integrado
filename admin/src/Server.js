import axios from 'axios';

const api = axios.create({
    baseURL: "https://eiback.azurewebsites.net",
    // baseURL: "http://192.168.0.105:21089",
});

export default api;