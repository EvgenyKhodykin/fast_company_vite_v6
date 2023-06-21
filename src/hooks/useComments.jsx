import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

function CommentsProvider({ children }) {
    const [comments, setComments] = useState([])
    const [isLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userId } = useParams()
    const { currentUser } = useAuth()

    useEffect(() => {
        setComments(null)
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

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        }
        console.log(comment)
    }

    return (
        <CommentsContext.Provider
            value={{ comments, isLoading, errorCatcher, createComment }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default CommentsProvider
