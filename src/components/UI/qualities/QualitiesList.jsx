import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './Qualitie'
import { useQualities } from '../../../hooks/useQualities'

export function QualitiesList({ qualities }) {
    const { isLoading, getCurrentQualities } = useQualities()
    const userQualities = getCurrentQualities(qualities)

    if (!isLoading) {
        return (
            <>
                {userQualities.map(item => (
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
