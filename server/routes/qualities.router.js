import express from 'express'
import Quality from '../models/Quality.js'

const qualitiesRouter = express.Router({ mergeParams: true })

qualitiesRouter.get('/', async (request, response) => {
    try {
        const list = await Quality.find()
        response.status(200).send(list)
    } catch (error) {
        response.status(500).json({
            message: response
                .status(500)
                .json({ message: 'Ошибка на сервере.Попробуйте позднее...' })
        })
    }
})

export default qualitiesRouter
