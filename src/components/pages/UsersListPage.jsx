import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Pagination from '../common/Pagination'
import paginate from '../../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from '../common/GroupList'
import SearchStatus from '../UI/SearchStatus'
import UserTable from '../UI/UsersTable'
import Loading from '../UI/Loading'
import { useAuth } from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions'
import { getUsersList } from '../../store/users'

export function UsersListPage() {
    const users = useSelector(getUsersList())
    const { currentUser } = useAuth()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const [searchValue, setSearchValue] = useState('')

    const pageSize = 4

    const handleToggleBookmark = id => {}

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
        const filterUsers = data => {
            let filteredUsers = null

            if (searchValue) {
                filteredUsers = data.filter(user =>
                    user.name.toLowerCase().includes(searchValue.toLowerCase())
                )
            } else if (selectedProf) {
                filteredUsers = data.filter(
                    user => user.profession === selectedProf.name
                )
            } else filteredUsers = data

            return filteredUsers.filter(user => user._id !== currentUser._id)
        }

        const filteredUsers = filterUsers(users)

        const count = filteredUsers.length

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
            setSearchValue('')
        }

        if (!professionsLoading && users) {
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
    }
    return <Loading />
}

UsersListPage.propTypes = {
    users: PropTypes.array
}
