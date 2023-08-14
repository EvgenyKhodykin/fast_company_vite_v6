import express from 'express'
import User from '../models/User.js'
import authMiddleware from '../middleware/auth.middleware.js'

const usersRouter = express.Router({ mergeParams: true })

usersRouter.patch('/:userId', authMiddleware, async (request, response) => {
    try {
        const { userId } = request.params

        if (userId === request.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, request.body, {
                new: true
            })
            response.send(updatedUser)
        } else {
            response.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        response.status(500).json({ message: 'Server PATCH user error' })
    }
})

usersRouter.get('/', authMiddleware, async (request, response) => {
    try {
        const list = await User.find()
        response.status(200).send(list)
    } catch (error) {
        response.status(500).json({ message: 'Server GET users error' })
    }
})

export default usersRouter
