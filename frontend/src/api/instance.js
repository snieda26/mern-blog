import axios from 'axios';


const instanceAPI = axios.create({
    baseURL: 'http://localhost:3001'
})


export default instanceAPI;