import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    const { currentUser } = useAuth()

    return currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
