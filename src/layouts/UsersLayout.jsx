import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UsersListPage, UserPage, EditUserPage } from '../components/pages'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../store/users'
import Loading from '../components/UI/Loading'

export function UsersLayout() {
    const { userId, edit } = useParams()
    const { currentUser } = useAuth()
    const dataStatus = useSelector(getDataStatus())
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList())
    }, [])

    if (!dataStatus) return <Loading />
    return (
        <>
            {userId ? (
                edit ? (
                    userId === currentUser._id ? (
                        <EditUserPage />
                    ) : (
                        <Navigate to={`/users/${currentUser._id}/edit`} />
                    )
                ) : (
                    <UserPage id={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    )
}
