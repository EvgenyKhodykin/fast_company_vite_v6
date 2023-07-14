import { React } from 'react'
import PropTypes from 'prop-types'
import Loading from '../UI/Loading'
import UserCard from '../UI/UserCard'
import QualitiesCard from '../UI/QualitiesCard'
import MeetingsCard from '../UI/MeetingsCard'
import CommentsColumn from '../common/comments/CommentsColumn'
import { useSelector } from 'react-redux'
import { getUserById } from '../../store/users'

export function UserPage({ id }) {
    const currentUser = useSelector(getUserById(id))

    if (currentUser) {
        return (
            <div className='container'>
                <div className='row gutters-sm'>
                    <div className='col-md-4 mb-3'>
                        <UserCard {...currentUser} />
                        <QualitiesCard {...currentUser} />
                        <MeetingsCard {...currentUser} />
                    </div>
                    <div className='col-md-8'>
                        <CommentsColumn userId={id} />
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
