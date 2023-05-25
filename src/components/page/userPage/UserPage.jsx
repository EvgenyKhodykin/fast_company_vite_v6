import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import API from '../../../api'
import Loading from '../../UI/Loading'
import UserCard from '../../UI/UserCard'
import QualitiesCard from '../../UI/QualitiesCard'
import MeetingsCard from '../../UI/MeetingsCard'
import CommentsList from '../../common/comments/CommentsList'

export function UserPage({ id }) {
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])

    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data))
        API.users.getById(id).then(data => setUser(data))
    }, [])

    if (user && users.length > 0) {
        return (
            <div className='container'>
                <div className='row gutters-sm'>
                    <div className='col-md-4 mb-3'>
                        <UserCard {...user} />
                        <QualitiesCard {...user} />
                        <MeetingsCard {...user} />
                    </div>
                    <div className='col-md-8'>
                        <CommentsList
                            userId={id}
                            users={users}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return <Loading />
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}
