import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/UserPage'
import UsersList from '../components/UsersList'

function UsersLayout() {
    const params = useParams()
    const { userId } = params
    return <>{userId ? <UserPage id={userId} /> : <UsersList />}</>
}

export default UsersLayout
