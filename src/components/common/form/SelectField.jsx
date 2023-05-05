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

    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options

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
                            key={option.label}
                            value={option.label}
                        >
                            {option.label}
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
