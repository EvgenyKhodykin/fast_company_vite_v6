import { React, useState, useEffect } from 'react'
import { orderBy } from 'lodash'
import PropTypes from 'prop-types'
import AddCommentForm from './AddCommentForm'
import CommentsList from './CommentsList'
import API from '../../../api'

function CommentsColumn({ userId, users }) {
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

    const handleRemove = id => {
        API.comments.remove(id).then(data => setCommentsForUser(data))
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
                        <CommentsList
                            comments={sortedComments}
                            users={users}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

CommentsColumn.propTypes = {
    userId: PropTypes.string,
    users: PropTypes.array
}

export default CommentsColumn
