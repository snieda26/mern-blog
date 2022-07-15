import axios from 'axios';


const instanceAPI = axios.create({
    baseURL: 'http://localhost:3001'
})


instanceAPI.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    console.log({ 'tokenAuth': localStorage.getItem('token') })

    return config;
})

export default instanceAPI;