import React from 'react'
import PropTypes from 'prop-types'

function SelectField({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '')
    }

    let optionsArray = null

    if (!Array.isArray(options) && typeof options === 'object') {
        optionsArray = Object.keys(options).map(optionName => ({
            name: options[optionName].name,
            value: options[optionName]._id
        }))
    } else optionsArray = options

    return (
        <div className='mb-4'>
            <label
                htmlFor={name}
                className='form-label'
            >
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                style={{ color: 'lightgrey' }}
            >
                <option
                    disabled
                    value=''
                >
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map(option => (
                        <option
                            key={option._id}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

SelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string
}

export default SelectField
