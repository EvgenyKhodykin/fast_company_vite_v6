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

    const handleSubmitForm = comment => {
        API.comments
            .add(comment)
            .then(comment => setCommentsForUser([...commentsForUser, comment]))
    }

    const handleRemoveComment = id => {
        API.comments
            .remove(id)
            .then(id =>
                setCommentsForUser(
                    commentsForUser.filter(comment => comment._id !== id)
                )
            )
    }

    return (
        <>
            <div className='card mb-2'>
                <div className='card-body '>
                    <AddCommentForm
                        users={users}
                        onSubmit={handleSubmitForm}
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
                            onRemove={handleRemoveComment}
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
