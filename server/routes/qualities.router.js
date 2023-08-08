import express from 'express'
import Quality from '../models/Quality.js'

const qualityRouter = express.Router({ mergeParams: true })

qualityRouter.get('/', async (request, response) => {
    try {
        const list = await Quality.find()
        response.status(200).send(list)
    } catch (error) {
        response.status(500).json({ message: 'Server error.Try again later...' })
    }
})

export default qualityRouter
