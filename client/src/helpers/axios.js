import axios from 'axios'

const asyncAxios = axios.create({
    baseURL: 'http://localhost:3000'
})

export default asyncAxios