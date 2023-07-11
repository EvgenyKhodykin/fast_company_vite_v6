import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'
// import { getIsLoggedIn } from '../../store/users'

function ProtectedRoutes() {
    const { currentUser } = useAuth()
    // const isLoggedIn = useSelector(getIsLoggedIn())
    const location = useLocation()

    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate
            to='/login'
            state={{ from: location }}
        />
    )
}

ProtectedRoutes.propTypes = {
    location: PropTypes.object
}

export default ProtectedRoutes
