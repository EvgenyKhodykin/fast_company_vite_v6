import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true
        },
        usersRecieved(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        usersRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: usersReducer } = usersSlice
const { usersRecieved, usersRequested, usersRequestFailed } = actions

export const loadUsersList = () => async dispatch => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.fetchAll()
        dispatch(usersRecieved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const getUsersList = () => state => state.users.entities

export const getUserById = userId => state => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId)
    }
}

export default usersReducer
