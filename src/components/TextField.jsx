import React from 'react'
import PropTypes from 'prop-types'

function TextField({ label, type, name, value, onChange }) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextField
