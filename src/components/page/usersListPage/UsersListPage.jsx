import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Pagination from '../../common/Pagination'
import paginate from '../../../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../UI/SearchStatus'
import UserTable from '../../UI/UsersTable'
import Loading from '../../UI/Loading'
import { useUser } from '../../../hooks/useUsers'
import { useProfessions } from '../../../hooks/useProfessions'

export function UsersListPage() {
    const { users } = useUser()
    const { professions } = useProfessions()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const [searchValue, setSearchValue] = useState('')

    const pageSize = 4

    // const handleDelete = userId => {
    //      setUsers(users.filter(user => user._id !== userId))

    // }

    // const handleToggleBookmark = id => {
    //     // setUsers(
    //     //     users.map(user => {
    //     //         if (user._id === id) {
    //     //             return {
    //     //                 ...user,
    //     //                 bookmark: !user.bookmark
    //     //             }
    //     //         }
    //     //         return user
    //     //     })
    //     // )
    // }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchValue])

    const handleProfessionSelect = item => {
        if (searchValue !== '') setSearchValue('')
        setSelectedProf(item)
    }

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex)
    }

    const handleSort = item => {
        setSortBy(item)
    }

    const handleSearch = ({ target }) => {
        setSelectedProf(undefined)
        setSearchValue(target.value)
    }

    if (users) {
        let filteredUsers = null

        if (searchValue) {
            filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
        } else if (selectedProf) {
            filteredUsers = users.filter(
                user => user.profession === selectedProf._id
            )
        } else filteredUsers = users

        const count = filteredUsers.length

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )

        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
            setSearchValue('')
        }

        if (professions && users) {
            return (
                <div className='d-flex'>
                    <div className='d-flex flex-column flex-shrink-0 p-3'>
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className='btn btn-secondary m-2'
                            onClick={clearFilter}
                        >
                            Clear
                        </button>
                    </div>

                    <div className='d-flex flex-column'>
                        <SearchStatus length={count} />
                        <div className='container'>
                            <i className='bi bi-search'> </i>
                            <input
                                type='text'
                                placeholder='search...'
                                className='w-50 border-0'
                                style={{ outline: 'none' }}
                                onChange={handleSearch}
                                value={searchValue}
                            />
                        </div>
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                // onDelete={handleDelete}
                                // onToggleBookMark={handleToggleBookmark}
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
    }
    return <Loading />
}

UsersListPage.propTypes = {
    users: PropTypes.array
}
