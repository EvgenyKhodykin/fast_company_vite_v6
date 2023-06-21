import React from 'react'
import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfessions'

function Profession({ id }) {
    const { isLoading } = useProfessions()

    if (!isLoading) {
        return <p>{id}</p>
    }
    return 'Loading...'
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
