import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import Loading from '../components/UI/Loading'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

function UserProvider({ children }) {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUsers()
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

    const getUsers = async () => {
        try {
            const { content } = await userService.get()
            setUsers(content)
            setLoading(false)
        } catch (error) {
            errorCatcher()
        }
    }

    return (
        <UserContext.Provider value={{ users }}>
            {!isLoading ? children : <Loading />}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UserProvider