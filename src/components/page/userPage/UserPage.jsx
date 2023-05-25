import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import API from '../../../api'
import Loading from '../../UI/Loading'
import UserCard from './UserCard'
import QualitiesCard from './QualitiesCard'
import MeetingsCard from './MeetingsCard'
import CommentsList from './CommentsList'

export function UserPage({ id }) {
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [commentsForUser, setCommentsForUser] = useState([])

    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data))
        API.users.getById(id).then(data => setUser(data))
        API.comments
            .fetchCommentsForUser(id)
            .then(data => setCommentsForUser(data))
    }, [])

    if (users.length > 0) {
        return (
            <div className='container'>
                <div className='row gutters-sm'>
                    <div className='col-md-4 mb-3'>
                        <UserCard {...user} />
                        <QualitiesCard {...user} />
                        <MeetingsCard {...user} />
                    </div>
                    <div className='col-md-8'>
                        {commentsForUser.length > 0 && (
                            <CommentsList
                                comments={commentsForUser}
                                users={users}
                            />
                        )}
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
