import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/BookMark'
import Qualities from './qualities'
import { Link } from 'react-router-dom'
import Profession from './Profession'
import Table from '../common/table/Table'

function UserTable({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: user => <Link to={user._id}>{user.name}</Link>
        },
        qualities: {
            name: 'Качества',
            component: user => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: 'Профессия',
            component: user => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: user => (
                <button onClick={() => onToggleBookMark(user._id)}>
                    <BookMark status={user.bookmark} />
                </button>
            )
        },
        delete: {
            component: user => (
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    }

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UserTable
