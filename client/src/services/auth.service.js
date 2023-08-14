import axios from 'axios'
import localStorageService from './localStorage.service'
import configFile from '../config.js'

const httpAuth = axios.create({
    baseURL: configFile.apiEndPoint + '/auth/',
    params: {
        key: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
    }
})

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post('signUp', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    logIn: async ({ email, password }) => {
        const { data } = await httpAuth.post('signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    refreshToken: async () => {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    }
}

export default authService
