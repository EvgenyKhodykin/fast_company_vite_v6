import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

function QualitiesProvider({ children }) {
    const [qualitiesList, setQualitiesList] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    const errorCatcher = error => {
        const { message } = error.response.data
        setError(message)
    }

    const getQualitiesList = async () => {
        try {
            const { content } = await qualityService.get()
            setQualitiesList(content)
            setLoading(false)
        } catch (error) {
            errorCatcher()
        }
    }

    const getCurrentQualities = userQualities => {
        return qualitiesList.filter(quality =>
            userQualities.includes(quality._id)
        )
    }

    return (
        <QualitiesContext.Provider value={{ isLoading, getCurrentQualities }}>
            {children}
        </QualitiesContext.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default QualitiesProvider
