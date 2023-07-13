import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../store/users'
import { Navigate } from 'react-router-dom'

export function LogOut() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userLogOut())
    }, [])

    return <Navigate to={'/'} />
}
