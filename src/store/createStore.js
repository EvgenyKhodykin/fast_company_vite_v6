import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'
import professionsReducer from './professions'
import usersReducer from './users'
import commentsReducer from './comments'

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
})

const store = configureStore({ reducer: rootReducer })

export default store
