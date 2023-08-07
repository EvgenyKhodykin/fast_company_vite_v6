export const getCurrentUser = state => {
    return state.users.entities
        ? state.users.entities.find(user => user._id === state.users.auth.userId)
        : null
}

export const getUserById = userId => state => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId)
    }
}

export const getUsersList = state => state.users.entities
export const getIsLoggedIn = state => state.users.isLoggedIn
export const getDataStatus = state => state.users.dataLoaded
export const getCurrentUserId = state => state.users.auth.userId
export const getUsersLoadingStatus = state => state.users.isLoading
export const getAuthError = state => state.users.error
