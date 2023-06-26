import React from 'react'
import useMockData from '../../utils/mockData'

export function MainPage() {
    const { error, initialize, progress, status } = useMockData()

    const handleClick = () => {
        initialize()
    }

    return (
        <div className='container mt-5'>
            <h3>Firebase data initialisation:</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button
                className='btn btn-primary mt-4'
                onClick={handleClick}
            >
                Initialize
            </button>
        </div>
    )
}
