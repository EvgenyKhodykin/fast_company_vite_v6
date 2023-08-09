import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import Comment from '../models/Comment.js'

const commentsRouter = express.Router({ mergeParams: true })

commentsRouter
    .route('/')
    .get(authMiddleware, async (request, response) => {
        try {
            const { orderBy, equalTo } = request.query
            const list = await Comment.find({ [orderBy]: equalTo })
            response.send(list)
        } catch (error) {
            response
                .status(500)
                .json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
        }
    })
    .post(authMiddleware, async (request, response) => {
        try {
            const newComment = await Comment.create({
                ...request.body,
                userId: request.user._id
            })

            response.status(201).send(newComment)
        } catch (error) {
            response
                .status(500)
                .json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
        }
    })

commentsRouter.delete('/:commentId', authMiddleware, async (request, response) => {
    try {
        const { commentId } = request.params
        const removedComment = await Comment.findById(commentId)

        if (removedComment.userId.toString() === request.user._id) {
            await removedComment.remove()
            return response.send(null)
        } else {
            return response.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        response.status(500).json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
    }
})

export default commentsRouter
