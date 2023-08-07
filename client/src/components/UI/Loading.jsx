import React from 'react'

function Loading() {
    return (
        <button className='btn btn-primary ms-5' type='button' disabled>
            <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>
            {'  '}
            Loading...
        </button>
    )
}

export default Loading
