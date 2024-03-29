import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UsersListPage, UserPage, EditUserPage } from '../components/pages'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users/selectors'
import UsersLoader from '../components/UI/hoc/UsersLoader'
import NavBar from '../components/UI/NavBar'

export function UsersLayout() {
    const { userId, edit } = useParams()
    const currentUserId = useSelector(getCurrentUserId)

    return (
        <>
            <NavBar />
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Navigate to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    )
}
