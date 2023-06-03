import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config'

axios.defaults.baseURL = config.apiEndPoint

axios.interceptors.response.use(
    response => response,
    function expError(error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            toast.error('Something wrong...')
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService
