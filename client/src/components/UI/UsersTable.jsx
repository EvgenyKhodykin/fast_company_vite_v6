import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/BookMark'
import Qualities from './qualities'
import { Link } from 'react-router-dom'
import Profession from './Profession'
import Table from '../common/table/Table'

function UserTable({ users, onSort, selectedSort, onToggleBookMark }) {
    const columns = {
        name: {
            path: 'name',
            name: 'Name',
            component: user => <Link to={user._id}>{user.name}</Link>
        },
        qualities: {
            name: 'Qualities',
            component: user => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: 'Profession',
            component: user => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Meetings'
        },
        rate: { path: 'rate', name: 'Rate' },
        bookmark: {
            path: 'bookmark',
            name: 'Bookmark',
            component: user => (
                <button onClick={() => onToggleBookMark(user._id)}>
                    <BookMark status={user.bookmark} />
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
    users: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onToggleBookMark: PropTypes.func
}

export default UserTable
