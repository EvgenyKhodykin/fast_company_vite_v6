import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Qualitie from './Qualitie'
import { useDispatch, useSelector } from 'react-redux'
import {
    getQualities,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from '../../../store/qualities'

export function QualitiesList({ qualities }) {
    const dispatch = useDispatch()
    const allQualities = useSelector(getQualities())
    const isLoading = useSelector(getQualitiesLoadingStatus())

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (!isLoading && allQualities.length > 0) {
        const qualitiesList = allQualities.filter(quality =>
            qualities.includes(quality._id)
        )
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
