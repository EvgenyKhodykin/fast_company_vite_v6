import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/comment.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: [],
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
        },
        commentCreated(state, action) {
            state.entities.push(action.payload)
        },
        commentRemoved(state, action) {
            state.entities = state.entities.filter(
                item => item._id !== action.payload
            )
        }
    }
})

const { actions, reducer: commentsReducer } = commentsSlice
const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions

const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentCreateFailed = createAction('comments/commentCreateFailed')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')
const commentRemoveFailed = createAction('comments/commentRemoveFailed')

export const loadCommentsList = userId => async dispatch => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsRecieved(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = payload => async dispatch => {
    dispatch(commentCreateRequested())
    try {
        const { content } = await commentService.createComment(payload)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentCreateFailed(error.message))
    }
}

export const removeComment = id => async dispatch => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.removeComment(id)
        if (content === null) {
            dispatch(commentRemoved(id))
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message))
    }
}

export default commentsReducer
