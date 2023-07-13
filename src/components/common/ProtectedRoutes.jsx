import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

function ProtectedRoutes() {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const location = useLocation()

    console.log(isLoggedIn)

    return isLoggedIn ? (
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
