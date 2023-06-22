import { React } from 'react'
import { orderBy } from 'lodash'
import PropTypes from 'prop-types'
import AddCommentForm from './AddCommentForm'
import CommentsList from './CommentsList'
import { useComments } from '../../../hooks/useComments'

function CommentsColumn({ users }) {
    const { comments, createComment, removeComment } = useComments()
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])

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
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
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
