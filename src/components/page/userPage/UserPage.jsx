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

    useEffect(() => {
        API.users.getById(id).then(data => setUser(data))
    }, [])

    if (user) {
        return (
            <div className='container'>
                <div className='row gutters-sm'>
                    <div className='col-md-4 mb-3'>
                        <UserCard {...user} />
                        <QualitiesCard {...user} />
                        <MeetingsCard {...user} />
                    </div>
                    <div className='col-md-8'>
                        <CommentsList userId={id} />
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
