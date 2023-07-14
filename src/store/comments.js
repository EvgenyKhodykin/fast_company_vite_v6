import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested(state) {
            state.isLoading = true
        },
        commentsRecieved(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: commentsReducer } = commentsSlice
const { commentsRequested, commentsRecieved, commentsRequestFailed } = actions

export const loadcommentsList = userId => async dispatch => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsRecieved(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const getcomments = () => state => state.comments.entities
export const getcommentsLoadingStatus = () => state => state.comments.isLoading

export default commentsReducer
