import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './Qualitie'

export function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map(item => (
                <Qualitie
                    key={item._id}
                    {...item}
                />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}
