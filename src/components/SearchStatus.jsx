import React from 'react'
import PropTypes from 'prop-types'

function SearchStatus({ length }) {
    const renderPhrase = length => {
        if (length === 0) return 'Никто не тусанёт'
        if (length === 1 || length > 4) return `${length} человек тусанёт`
        return `${length} человека тусанут`
    }

    return (
        <h2>
            <span className={'badge m-2 bg-' + (length > 0 ? 'primary' : 'danger')}>
                {renderPhrase(length)} с тобой сегодня
            </span>
        </h2>
    )
}

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
