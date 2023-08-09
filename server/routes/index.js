import express from 'express'
import authRouter from './auth.router.js'
import professionsRouter from './professions.router.js'
import qualitiesRouter from './qualities.router.js'
import usersRouter from './user.router.js'
import commentsRouter from './comments.router.js'

const router = express.Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/professions', professionsRouter)
router.use('/qualities', qualitiesRouter)
router.use('/users', usersRouter)
router.use('/comments', commentsRouter)

export default router
