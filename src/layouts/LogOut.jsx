import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/UI/Loading'

export function LogOut() {
    const { logOut } = useAuth()

    useEffect(() => {
        logOut()
    }, [])

    return <Loading />
}
