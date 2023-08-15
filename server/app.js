import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import chalk from 'chalk'
import cors from 'cors'
import router from './routes/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', router)

const PORT = config.get('port') ?? 8080

async function start() {
    try {
        mongoose.connection.once('open', () => {})
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.yellow('MongoDB connected'))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        })
    } catch (error) {
        console.log(chalk.red(error.message))
        process.exit(1)
    }
}

start()
