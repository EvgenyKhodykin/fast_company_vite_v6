import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

            const expiresDate = localStorageService.getTokenExpiresDate()
            const refreshToken = localStorageService.getRefreshToken()
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refreshToken()

                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    if (data && !data._id) {
        return Object.keys(data).map(key => ({
            ...data[key]
        }))
    }
    return data
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
    delete: http.delete,
    patch: http.patch
}

export default httpService
