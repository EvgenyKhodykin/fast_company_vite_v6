import { React } from 'react'
import { NavLink } from 'react-router-dom'
import NavProfile from './NavProfile'
import { getIsLoggedIn } from '../../store/users/selectors'
import { useSelector } from 'react-redux'

function NavBar() {
    const isLoggedIn = useSelector(getIsLoggedIn)

    return (
        <header>
            <nav className='navbar mx-2 bg-light'>
                <div className='container-fluid'>
                    <ul className='nav nav-pills'>
                        <li className='nav-item'>
                            <NavLink
                                className='nav-link'
                                to='/'
                            >
                                Main
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            <li className='nav-item'>
                                <NavLink
                                    className='nav-link'
                                    to='/users'
                                >
                                    Users
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className='d-flex'>
                        {isLoggedIn ? (
                            <NavProfile />
                        ) : (
                            <NavLink
                                className='nav-link'
                                to='/login'
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
