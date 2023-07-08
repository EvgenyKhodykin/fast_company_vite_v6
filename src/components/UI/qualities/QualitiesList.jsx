import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Qualitie from './Qualitie'
import { useDispatch, useSelector } from 'react-redux'
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from '../../../store/qualities'

export function QualitiesList({ qualities }) {
    const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesByIds(qualities))

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (!isLoading) {
        return (
            <>
                {qualitiesList.map(item => (
                    <Qualitie
                        key={item._id}
                        {...item}
                    />
                ))}
            </>
        )
    }
    return 'Loading...'
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}
