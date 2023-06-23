import { React } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../UI/Loading'
import UserCard from '../../UI/UserCard'
import QualitiesCard from '../../UI/QualitiesCard'
import MeetingsCard from '../../UI/MeetingsCard'
import CommentsColumn from '../../common/comments/CommentsColumn'
import { useUser } from '../../../hooks/useUsers'
import CommentsProvider from '../../../hooks/useComments'

export function UserPage({ id }) {
    const { getUserById } = useUser()
    const user = getUserById(id)

    // const handleChange = async => {
    //     try {
    //     } catch (error) {}
    // }

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
                        <CommentsProvider>
                            <CommentsColumn userId={id} />
                        </CommentsProvider>
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
