/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import getCommentDate from '../../../utils/getCommentDate'
import { getCurrentUserId, getUserById } from '../../../store/users/selectors'
import { useSelector } from 'react-redux'

function Comment({ _id, created_at, content, userId, onRemove }) {
    const currentUserId = useSelector(getCurrentUserId)
    const commentAuthor = useSelector(getUserById(userId))

    return (
        <div className='bg-light card-body  mb-3'>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex flex-start '>
                        <img
                            src={commentAuthor.image}
                            className='rounded-circle shadow-1-strong me-3'
                            alt='avatar'
                            width='60'
                        />
                        <div className='flex-grow-1 flex-shrink-1'>
                            <div className='mb-4'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-1 '>
                                        {commentAuthor.name}
                                        <span className='small'>
                                            {' - '}
                                            {getCommentDate(created_at)}
                                        </span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            onClick={() => onRemove(_id)}
                                            className='btn btn-sm text-primary d-flex align-items-center'
                                        >
                                            <i className='bi bi-x-lg'></i>
                                        </button>
                                    )}
                                </div>
                                <p className='small mb-0'>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    created_at: PropTypes.number,
    content: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
}

export default Comment
