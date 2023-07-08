import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionService from '../services/profession.service'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionContext)
}

function ProfessionsProvider({ children }) {
    const [professions, setProfessions] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
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

    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.fetchAll()
            setProfessions(content)
            setLoading(false)
        } catch (error) {
            errorCatcher()
        }
    }

    const getProfession = id => {
        return professions.find(profession => profession._id === id)
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    )
}

ProfessionsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ProfessionsProvider
