import React from 'react'
import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfessions'

function Profession({ id }) {
    const { isLoading, getProfession } = useProfessions()
    const profession = getProfession(id)

    if (!isLoading) {
        return <p>{profession.name}</p>
    }
    return 'Loading...'
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession