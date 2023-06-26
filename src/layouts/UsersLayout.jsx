import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UsersListPage, UserPage, EditUserPage } from '../components/pages'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

export function UsersLayout() {
    const { userId, edit } = useParams()
    const { currentUser } = useAuth()

    return (
        <>
            <UserProvider>
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
            </UserProvider>
        </>
    )
}
