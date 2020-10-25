import { REACT_APP_API_URL } from '@env'
import axios from 'axios'

const api = axios.create({
    baseURL: REACT_APP_API_URL
})

export default api