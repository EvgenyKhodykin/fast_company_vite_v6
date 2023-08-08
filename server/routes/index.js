import express from 'express'
import authRouter from './auth.router.js'
import professionsRouter from './professions.router.js'
import qualityRouter from './qualities.router.js'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/professions', professionsRouter)
router.use('/qualities', qualityRouter)
// router.use('/comments', authRouter)
// router.use('/users', authRouter)

export default router
