import React from 'react'
import PropTypes from 'prop-types'

function SearchString({ onChange, value }) {
    return (
        <div className='container'>
            <i className='bi bi-search'> </i>
            <input
                type='text'
                placeholder='поиск...'
                className='w-50 border-0'
                style={{ outline: 'none' }}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

SearchString.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default SearchString
