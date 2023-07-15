import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn, getUsersLoadingStatus } from '../../../store/users/selectors'
import PropTypes from 'prop-types'
import { loadQualitiesList } from '../../../store/qualities/slice'
import { loadProfessionsList } from '../../../store/professions/slice'
import Loading from '../Loading'
import { loadUsersList } from '../../../store/users/slice'

function AppLoader({ children }) {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn)
    const usersStatusLoading = useSelector(getUsersLoadingStatus)

    useEffect(() => {
        dispatch(loadQualitiesList)
        dispatch(loadProfessionsList)
        if (isLoggedIn) {
            dispatch(loadUsersList)
        }
    }, [isLoggedIn])

    if (usersStatusLoading) return <Loading />
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppLoader
