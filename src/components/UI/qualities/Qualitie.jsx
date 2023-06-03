import React from 'react'
import PropTypes from 'prop-types'

function Qualitie({ color, name }) {
    return <span className={`badge m-1 bg-${color}`}>{name}</span>
}

Qualitie.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string
}

export default Qualitie
