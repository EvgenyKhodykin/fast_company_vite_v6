import express from 'express'
import authRouter from './auth.router.js'
import professionsRouter from './professions.router.js'
import qualityRouter from './qualities.router.js'
import userRouter from './user.router.js'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/professions', professionsRouter)
router.use('/qualities', qualityRouter)
router.use('/users', userRouter)
// router.use('/comments', authRouter)

export default router
