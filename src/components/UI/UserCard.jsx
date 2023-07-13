import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../store/users'

function UserCard({ name, profession, rate, _id, image }) {
    const currentUserId = useSelector(getCurrentUserId())

    return (
        <div className='card mb-3'>
            <div className='card-body'>
                {currentUserId === _id && (
                    <Link to={`/users/${_id}/edit`}>
                        <button className='position-absolute top-0 end-0 btn btn-light btn-sm'>
                            <i className='bi bi-gear'></i>
                        </button>
                    </Link>
                )}
                <div className='d-flex flex-column align-items-center text-center position-relative'>
                    <img
                        src={image}
                        className='rounded-circle shadow-1-strong me-3'
                        alt='avatar'
                        width='150'
                    />
                    <div className='mt-3'>
                        <h4>{name}</h4>
                        <p className='text-secondary mb-1'>{profession.name}</p>
                        <div className='text-muted'>
                            <i
                                className='bi bi-caret-down-fill text-primary'
                                role='button'
                            ></i>
                            <i
                                className='bi bi-caret-up text-secondary'
                                role='button'
                            ></i>
                            <span className='ms-2'>{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number,
    _id: PropTypes.string,
    image: PropTypes.string
}

export default UserCard
