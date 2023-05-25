/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'

function Comment({ created_at, content, userId, users }) {
    const commentAuthor = users.filter(user => user._id === userId)[0].name

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const commentDate = () => {
        const difference = Date.now() - Number(created_at)
        if (difference <= 60000) return '1 минуту назад'
        else if (difference > 60000 && difference <= 300000) {
            return '5 минут назад'
        } else if (difference > 300000 && difference <= 600000) {
            return '10 минут назад'
        } else if (difference > 600000 && difference <= 1800000) {
            return '30 минут назад'
        } else if (difference > 1800000 && difference <= 3600000) {
            return '30 минут назад'
        } else if (difference > 3600000 && difference <= 86400000) {
            return `${new Date(Number(created_at)).getHours()} ${new Date(
                Number(created_at)
            ).getMinutes()}`
        } else if (difference > 86400000 && difference <= 2419200000) {
            return `${new Date(Number(created_at)).getDate()} ${
                monthNames[new Date(Number(created_at)).getMonth()]
            }`
        }
        return `${new Date(Number(created_at)).getDate()} ${
            monthNames[new Date(Number(created_at)).getMonth()]
        } ${new Date(Number(created_at)).getFullYear()}`
    }

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
                                            {commentDate()}
                                        </span>
                                    </p>
                                    <button className='btn btn-sm text-primary d-flex align-items-center'>
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
    userId: PropTypes.string
}

export default Comment
