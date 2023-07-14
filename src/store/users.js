import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import getRandomInt from '../utils/getRandomInt'
import generateAuthError from '../utils/generateAuthError'
import { history } from '../utils/history'

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      }

const usersSlice = createSlice({
    name: 'users',
    initialState,
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
        userUpdated(state, action) {
            const index = state.entities.findIndex(
                item => item._id === action.payload._id
            )
            state.entities[index] = action.payload
        },
        userLoggedOut(state) {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        authRequestSuccess(state, action) {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed(state, action) {
            state.error = action.payload
        },
        authRequested(state) {
            state.error = null
        }
    }
})

const { actions, reducer: usersReducer } = usersSlice
const {
    usersRecieved,
    usersRequested,
    usersRequestFailed,
    userCreated,
    userUpdated,
    userLoggedOut,
    authRequestSuccess,
    authRequestFailed
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const signIn =
    ({ email, password }, fromPage) =>
    async dispatch => {
        dispatch(authRequested())
        try {
            const data = await authService.logIn({ email, password })
            localStorageService.setTokens(data)
            dispatch(authRequestSuccess({ userId: data.localId }))
            history.navigate(fromPage)
        } catch (error) {
            const { code, message } = error.response.data.error
            if (code === 400) {
                const errorMessage = generateAuthError(message)
                dispatch(authRequestFailed(errorMessage))
            } else dispatch(authRequestFailed(error.message))
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

export const userLogOut = () => dispatch => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
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

export const updateCurrentUser = payload => async dispatch => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.updateCurrentUser(payload)
        dispatch(userUpdated(content))
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
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

export const getCurrentUser = () => state => {
    return state.users.entities
        ? state.users.entities.find(user => user._id === state.users.auth.userId)
        : null
}

export const getUserById = userId => state => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId)
    }
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth.userId
export const getUsersLoadingStatus = () => state => state.users.isLoading
export const getAuthError = () => state => state.users.error

export default usersReducer
