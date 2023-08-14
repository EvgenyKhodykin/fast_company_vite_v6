import express from 'express'
import bcrypt from 'bcryptjs'
import { check, validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateUserData } from '../utils/helpers.js'
import tokenService from '../services/token.service.js'

const authRouter = express.Router({ mergeParams: true })

authRouter.post('/signUp', [
    check('email', 'Неверный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors: errors.array()
                    }
                })
            }

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
            console.log(newUser)

            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)

            response.status(201).send({ ...tokens, userId: newUser._id })
        } catch (error) {
            response.status(500).json({ message: 'Server singUp error...' })
        }
    }
])

authRouter.post('/signInWithPassword', [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль!').exists(),
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                    }
                })
            }

            const { email, password } = request.body

            const existingUser = await User.findOne({ email })

            if (!existingUser) {
                response.status(400).send({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                })
            }

            const isPasswordEqual = bcrypt.compare(password, existingUser.password)
            if (!isPasswordEqual) {
                response.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({ _id: existingUser._id })
            await tokenService.save(existingUser._id, tokens.refreshToken)

            response.status(200).send({ ...tokens, userId: existingUser._id })
        } catch (error) {
            response.status(500).json({ message: 'Server signIn error...' })
        }
    }
])

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

authRouter.post('/token', async (request, response) => {
    try {
        const { refresh_token: refreshToken } = request.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)

        if (isTokenInvalid(data, dbToken)) {
            return response.status(401).json({ message: 'Unauthorized' })
        }

        const tokens = tokenService.generate({
            _id: data._id
        })

        await tokenService.save(data._id, tokens.refreshToken)

        response.status(200).send({ ...tokens, userId: data._id })
    } catch (error) {
        response.status(500).json({ message: 'Server auth error...' })
    }
})

export default authRouter
