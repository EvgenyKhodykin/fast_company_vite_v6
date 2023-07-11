import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import getRandomInt from '../utils/getRandomInt'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true
        },
        usersRecieved(state, action) {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        usersRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        authRequestSuccess(state, action) {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed(state, action) {
            state.error = action.payload
        }
    }
})

const { actions, reducer: usersReducer } = usersSlice
const {
    usersRecieved,
    usersRequested,
    usersRequestFailed,
    userCreated,
    authRequestSuccess,
    authRequestFailed
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')

export const signIn =
    ({ email, password }) =>
    async dispatch => {
        dispatch(authRequested())
        try {
            const data = await authService.logIn({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequestSuccess({ userId: data.localId }))
        } catch (error) {
            dispatch(authRequestFailed(error.message))
        }
    }

export const signUp =
    ({ email, password, ...rest }) =>
    async dispatch => {
        dispatch(authRequested())
        try {
            const data = await authService.register({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequestSuccess({ userId: data.localId }))
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            )
        } catch (error) {
            dispatch(authRequestFailed(error.message))
        }
    }

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested())
        try {
            const { content } = await userService.create(payload)
            dispatch(userCreated(content))
        } catch (error) {
            dispatch(userCreateFailed(error.message))
        }
    }
}

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
export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth.userId

export default usersReducer
