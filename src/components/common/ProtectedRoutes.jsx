import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoutes() {
    const { currentUser } = useAuth()
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
