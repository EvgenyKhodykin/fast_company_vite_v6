import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateUserData } from '../utils/helpers.js'
import tokenService from '../services/token.service.js'

const authRouter = express.Router({ mergeParams: true })

authRouter.post('/signUp', async (request, response) => {
    try {
        const { email, password } = request.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return response.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            ...generateUserData(),
            ...request.body,
            password: hashedPassword
        })

        const tokens = tokenService.generate({ _id: newUser._id })
        await tokenService.save(newUser._id, tokens.refreshToken)

        response.status(201).send({ ...tokens, userId: newUser._id })
    } catch (error) {
        response.status(500).json({ message: 'Server error.Try again later...' })
    }
})

authRouter.post('/signInWithPassword', async (request, response) => {})

authRouter.post('/token', async (request, response) => {})

export default authRouter
