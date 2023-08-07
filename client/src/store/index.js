import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities/slice'
import professionsReducer from './professions/slice'
import usersReducer from './users/slice'
import commentsReducer from './comments/slice'

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
})

const store = configureStore({ reducer: rootReducer })

export default store
