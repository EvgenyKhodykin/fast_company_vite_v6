import { React, useEffect } from 'react'
import { orderBy } from 'lodash'
import PropTypes from 'prop-types'
import AddCommentForm from './AddCommentForm'
import CommentsList from './CommentsList'
import { useComments } from '../../../hooks/useComments'
import { useDispatch, useSelector } from 'react-redux'
import {
    getcomments,
    getcommentsLoadingStatus,
    loadcommentsList
} from '../../../store/comments'
import Loading from '../../UI/Loading'
import { useParams } from 'react-router-dom'

function CommentsColumn({ users }) {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const isLoading = useSelector(getcommentsLoadingStatus())
    const { createComment, removeComment } = useComments()
    const comments = useSelector(getcomments())
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])

    useEffect(() => {
        dispatch(loadcommentsList(userId))
    }, [userId])

    const handleSubmitForm = data => {
        createComment(data)
    }

    const handleRemoveComment = id => {
        removeComment(id)
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

            {comments.length > 0 && (
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
            )}
        </>
    )
}

CommentsColumn.propTypes = {
    userId: PropTypes.string,
    users: PropTypes.array
}

export default CommentsColumn
