import React from 'react'
import { useParams } from 'react-router-dom'
import { UsersListPage, UserPage, EditUserPage } from '../components/pages'
import UserProvider from '../hooks/useUsers'

export function UsersLayout() {
    const { userId, edit } = useParams()

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
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
