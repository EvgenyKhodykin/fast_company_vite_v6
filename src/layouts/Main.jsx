import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Main() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Main
