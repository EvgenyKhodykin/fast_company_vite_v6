/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import getCommentDate from '../../../utils/getCommentDate'

function Comment({ _id, created_at, content, userId, users, onRemove }) {
    const commentAuthor = users.filter(user => user._id === userId)[0].name

    return (
        <div className='bg-light card-body  mb-3'>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex flex-start '>
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className='rounded-circle shadow-1-strong me-3'
                            alt='avatar'
                            width='60'
                        />
                        <div className='flex-grow-1 flex-shrink-1'>
                            <div className='mb-4'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-1 '>
                                        {commentAuthor}
                                        <span className='small'>
                                            {' - '}
                                            {getCommentDate(created_at)}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => onRemove(_id)}
                                        className='btn btn-sm text-primary d-flex align-items-center'
                                    >
                                        <i className='bi bi-x-lg'></i>
                                    </button>
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
    created_at: PropTypes.string,
    content: PropTypes.string,
    users: PropTypes.array,
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
}

export default Comment
