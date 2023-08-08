import express from 'express'

const authRouter = express.Router({ mergeParams: true })

authRouter.post('/signUp', async (req, res) => {})
authRouter.post('/signInWithPassword', async (req, res) => {})
authRouter.post('/token', async (req, res) => {})

export default authRouter
