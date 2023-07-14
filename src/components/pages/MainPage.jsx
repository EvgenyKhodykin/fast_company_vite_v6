import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsLoggedIn } from '../../store/users'

export function MainPage() {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const currentUser = useSelector(getCurrentUser())

    if (isLoggedIn) {
        return (
            <div className='container mt-5'>
                <h3>Hi, {currentUser.name}! Welcome back &#128578; </h3>
            </div>
        )
    }
    return (
        <div className='container mt-5'>
            <h3>Welcome to Fast Company, comrad!</h3>
        </div>
    )
}
