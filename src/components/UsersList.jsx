import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Pagination from './Pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './GroupList'
import API from '../api'
import SearchStatus from './SearchStatus'
import UserTable from './UsersTable'

function UsersList() {
    const [users, setUsers] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })

    const pageSize = 4

    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data))
    }, [])

    const handleDelete = userId => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const handleToggleBookmark = id => {
        setUsers(
            users.map(user => {
                if (user._id === id) {
                    return {
                        ...user,
                        bookmark: !user.bookmark
                    }
                }
                return user
            })
        )
    }

    useEffect(() => {
        API.professions.fetchAll().then(data => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = item => {
        setSelectedProf(item)
    }

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex)
    }

    const handleSort = item => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => user.profession._id === selectedProf._id)
            : users

        const count = filteredUsers.length

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className='d-flex'>
                {professions && (
                    <div className='d-flex flex-column flex-shrink-0 p-3'>
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button className='btn btn-secondary m-2' onClick={clearFilter}>
                            Очистить
                        </button>
                    </div>
                )}

                <div className='d-flex flex-column'>
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookmark}
                        />
                    )}
                    <div className='d-flex justify-content-center'>
                        <Pagination
                            currentPage={currentPage}
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'Loading...'
}

UsersList.propTypes = {
    users: PropTypes.array
}

export default UsersList
