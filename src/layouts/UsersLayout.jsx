import React from 'react'
import { useParams } from 'react-router-dom'
import { UsersListPage } from '../components/page/usersListPage'
import { UserPage } from '../components/page/userPage'
import { EditUserPage } from '../components/page/editUserPage/EditUserPage'
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
