import express from 'express'
import User from '../models/User.js'
import authMiddleware from '../middleware/auth.middleware.js'

const userRouter = express.Router({ mergeParams: true })

userRouter.patch('/:userId', authMiddleware, async (request, response) => {
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
        response.status(500).json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
    }
})

userRouter.get('/', authMiddleware, async (request, response) => {
    try {
        const list = await User.find()
        response.status(200).send(list)
    } catch (error) {
        response.status(500).json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
    }
})

export default userRouter
