import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config'

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    if (data) {
        return Object.keys(data).map(key => ({
            ...data[key]
        }))
    }
    return []
}

http.interceptors.response.use(
    response => {
        if (configFile.isFireBase) {
            response.data = { content: transformData(response.data) }
        }
        return response
    },
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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}

export default httpService
