import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsLoggedIn } from '../../store/users/selectors'

export function MainPage() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    const currentUser = useSelector(getCurrentUser)

    if (isLoggedIn && currentUser) {
        return (
            <div className='container mt-5'>
                <h3>Hi, {currentUser.name}! Welcome to Fast Company! &#128578; </h3>
            </div>
        )
    }
    return (
        <div className='container mt-5'>
            <h3 className='text-danger'>Fast Company Main Page</h3>
        </div>
    )
}
