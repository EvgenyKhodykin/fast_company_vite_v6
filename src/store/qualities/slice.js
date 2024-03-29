import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../../services/quality.service'
import isOutdated from '../../utils/isOutdated'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested(state) {
            state.isLoading = true
        },
        qualitiesRecieved(state, action) {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice
const { qualitiesRecieved, qualitiesRequested, qualitiesRequestFailed } = actions

export const loadQualitiesList = async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const { content } = await qualityService.fetchAll()
            dispatch(qualitiesRecieved(content))
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message))
        }
    }
}

export default qualitiesReducer
