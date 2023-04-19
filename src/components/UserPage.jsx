import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import QualitiesList from './QualitiesList'
import API from '../api'
import Loading from './Loading'

function UserPage({ id }) {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        API.users.getById(id).then(data => setUser(data))
    }, [])

    const handleUsers = () => {
        navigate('/users', { replace: true })
    }

    if (user) {
        return (
            <div className='ms-3'>
                <h1>{user.name}</h1>
                <h3>Профессия: {user.profession.name}</h3>
                <QualitiesList {...user} />
                <div>completedMeetings: {user.completedMeetings}</div>
                <h3>Rate: {user.rate}</h3>
                <button className='btn btn-outline-primary' onClick={handleUsers}>
                    Все пользователи
                </button>
            </div>
        )
    }
    return <Loading />
}

UserPage.propTypes = {
    id: PropTypes.string
}

export default UserPage
