import express from 'express'
import authRouter from './auth.routes.js'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/comment', authRouter)
router.use('/quality', authRouter)
router.use('/profession', authRouter)
router.use('/user', authRouter)

export default router
