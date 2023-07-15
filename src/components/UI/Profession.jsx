import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionsLoadingStatus } from '../../store/professions'

function Profession({ id }) {
    const professionsLoading = useSelector(getProfessionsLoadingStatus)

    if (!professionsLoading) {
        return <p>{id}</p>
    }
    return 'Loading...'
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
