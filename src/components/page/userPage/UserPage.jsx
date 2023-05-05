import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Qualities from '../../UI/qualities'
import API from '../../../api'
import Loading from '../../UI/Loading'

export function UserPage({ id }) {
    const [user, setUser] = useState()

    useEffect(() => {
        API.users.getById(id).then(data => setUser(data))
    }, [])

    if (user) {
        return (
            <div className='ms-3'>
                <h1>{user.name}</h1>
                <h3>Профессия: {user.profession.name}</h3>
                <Qualities {...user} />
                <div>completedMeetings: {user.completedMeetings}</div>
                <h3>Rate: {user.rate}</h3>
                <Link to={`/users/${id}/edit`}>
                    <button className='btn btn-outline-primary'>
                        Изменить
                    </button>
                </Link>
            </div>
        )
    }
    return <Loading />
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}
