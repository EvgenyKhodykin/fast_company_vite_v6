import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

function MultiSelectField({ onChange, options, name, label }) {
    let optionsArray = null

    if (!Array.isArray(options) && typeof options === 'object') {
        optionsArray = Object.keys(options).map(optionName => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }))
    } else optionsArray = options

    const handleChange = value => {
        onChange({ name, value })
    }

    return (
        <div className='mb-4'>
            <label className='form-label'>{label}</label>
            <Select
                isMulti
                options={optionsArray}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handleChange}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    label: PropTypes.string
}

export default MultiSelectField
