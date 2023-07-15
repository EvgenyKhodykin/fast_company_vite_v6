import { React, useEffect } from 'react'
import { orderBy } from 'lodash'
import PropTypes from 'prop-types'
import AddCommentForm from './AddCommentForm'
import CommentsList from './CommentsList'
import { useDispatch, useSelector } from 'react-redux'
import {
    createComment,
    loadCommentsList,
    removeComment
} from '../../../store/comments/slice'
import Loading from '../../UI/Loading'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getCurrentUserId } from '../../../store/users'
import {
    getComments,
    getCommentsLoadingStatus
} from '../../../store/comments/selectors'

function CommentsColumn({ users }) {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const currentUserId = useSelector(getCurrentUserId)
    const isLoading = useSelector(getCommentsLoadingStatus)
    const comments = useSelector(getComments)
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])

    useEffect(() => {
        dispatch(loadCommentsList(userId))
    }, [userId])

    const handleSubmitForm = data => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        }
        dispatch(createComment(comment))
    }

    const handleRemoveComment = id => {
        dispatch(removeComment(id))
    }

    return (
        <>
            <div className='card mb-2'>
                <div className='card-body '>
                    <AddCommentForm
                        users={users}
                        onSubmit={handleSubmitForm}
                    />
                </div>
            </div>

            <div className='card mt-3'>
                <div className='card-body '>
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading ? (
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    )
}

CommentsColumn.propTypes = {
    userId: PropTypes.string,
    users: PropTypes.array
}

export default CommentsColumn
