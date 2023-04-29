import { React } from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <nav className='nav nav-pills m-2'>
            <NavLink className='nav-link' to='/'>
                Main
            </NavLink>

            <NavLink className='nav-link' to='/login'>
                Login
            </NavLink>

            <NavLink className='nav-link' to='/users'>
                Users
            </NavLink>
        </nav>
    )
}

export default NavBar
