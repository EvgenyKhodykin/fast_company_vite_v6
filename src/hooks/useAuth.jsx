import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [error, setError] = useState(null)

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
            import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
        }`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            localStorageService.setTokens(data)
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

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
            import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY
        }`

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            localStorageService.setTokens(data)
            await createUser({ _id: data.localId, email, ...rest })
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
            const { content } = userService.create(data)
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

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
