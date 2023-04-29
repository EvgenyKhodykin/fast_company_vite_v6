import React from 'react'
import PropTypes from 'prop-types'

function BookMark({ status }) {
    const handleClassName = status => {
        return status ? 'bi bi-bookmark-check-fill' : 'bi bi-bookmark'
    }

    return <i className={handleClassName(status)}></i>
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
}
export default BookMark
