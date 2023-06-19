import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState(null)

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                'accounts:signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            localStorageService.setTokens(data)
            getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Incorrect Email'
                    }
                    throw errorObject
                }
                const errorObject = {
                    password: 'Incorrect Password'
                }
                throw errorObject
            }
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:  signUp', {
                email,
                password,
                returnSecureToken: true
            })
            localStorageService.setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'This Email already exists'
                    }
                    throw errorObject
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function getUserData() {
        try {
            const { content } = userService.getCurrentUser()
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    const errorCatcher = error => {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
