import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

function CommentsList({ comments, users, onRemove }) {
    return (
        <>
            {comments.map(comment => (
                <Comment
                    key={comment._id}
                    {...comment}
                    users={users}
                    onRemove={onRemove}
                />
            ))}
        </>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array,
    onRemove: PropTypes.func
}

export default CommentsList
