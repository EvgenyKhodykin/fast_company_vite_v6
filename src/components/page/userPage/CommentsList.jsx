import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

function CommentsList({ comments, allUsers }) {
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
                    {comments.map(comment => (
                        <Comment
                            key={comment._id}
                            {...comment}
                            allUsers={allUsers}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    allUsers: PropTypes.array
}

export default CommentsList
