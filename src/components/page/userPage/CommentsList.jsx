import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import API from '../../../api'

function CommentsList({ userId }) {
    const [users, setUser] = useState([])
    const [commentsForUser, setCommentsForUser] = useState([])
    console.log(commentsForUser)

    useEffect(() => {
        API.users.fetchAll(userId).then(data => setUser(data))
    }, [])

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then(data => {
            const commentAuthorName = users.filter(
                user => user._id === userId
            )[0]
            const updatedCommentsForUser = data.map(comment => ({
                ...comment,
                authorName: commentAuthorName.name
            }))
            setCommentsForUser(updatedCommentsForUser)
        })
    }, [users])

    if (users.length > 0 && commentsForUser.length > 0) {
        return (
            <>
                <div className='card mb-2'>
                    {' '}
                    <div className='card-body '>{''}</div>
                </div>
                <div className='card mb-3'>
                    <div className='card-body '>
                        <h2>Comments</h2>
                        <hr />
                        {commentsForUser.map(comment => (
                            <Comment
                                key={comment._id}
                                {...comment}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

CommentsList.propTypes = {
    userId: PropTypes.string
}

export default CommentsList
