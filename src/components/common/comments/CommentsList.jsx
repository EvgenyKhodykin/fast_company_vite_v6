import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import Comment from './Comment'
import AddCommentForm from './AddCommentForm'
import API from '../../../api'

function CommentsList({ userId, users }) {
    const [commentsForUser, setCommentsForUser] = useState([])
    const sortedComments = orderBy(commentsForUser, ['created_at'], ['desc'])

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then(data => setCommentsForUser(data))
    }, [])

    const handleSubmit = comment => {
        API.comments
            .add(comment)
            .then(data => setCommentsForUser([...commentsForUser, data]))
    }

    return (
        <>
            <div className='card mb-2'>
                <div className='card-body '>
                    <AddCommentForm
                        users={users}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
            {commentsForUser.length > 0 && (
                <div className='card mb-3'>
                    <div className='card-body '>
                        <h2>Comments</h2>
                        <hr />
                        {sortedComments.map(comment => (
                            <Comment
                                key={comment._id}
                                {...comment}
                                users={users}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

CommentsList.propTypes = {
    userId: PropTypes.string,
    users: PropTypes.array
}

export default CommentsList
