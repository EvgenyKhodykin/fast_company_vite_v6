import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

function Table({ onSort, selectedSort, columns, data }) {
    return (
        <table className='table  m-2'>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data }} />
        </table>
    )
}

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array
}

export default Table
