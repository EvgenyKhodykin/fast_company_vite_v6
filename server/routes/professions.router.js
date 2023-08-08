import express from 'express'
import Profession from '../models/Profession.js'

const professionsRouter = express.Router({ mergeParams: true })

professionsRouter.get('/', async (request, response) => {
    try {
        const list = await Profession.find()
        response.status(200).send(list)
    } catch (error) {
        response.status(500).json({ message: 'Server error.Try again later...' })
    }
})

export default professionsRouter
