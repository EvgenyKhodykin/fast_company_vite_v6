import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import isOutdated from '../utils/isOutdated'

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested(state) {
            state.isLoading = true
        },
        professionsRecieved(state, action) {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: professionsReducer } = professionsSlice
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
    actions

export const loadProfessionsList = async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.fetchAll()
            dispatch(professionsRecieved(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error.message))
        }
    }
}

export const getProfessions = state => state.professions.entities
export const getProfessionsLoadingStatus = state => state.professions.isLoading

export default professionsReducer
