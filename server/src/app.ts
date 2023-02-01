import express  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import 'reflect-metadata'

import { AppDataSource } from './app-data-source'
import router from './routes'

const app = express()
const savePath = path.join(__dirname, '..', '..', 'uploads')

dotenv.config()

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch(err => {
        console.error('Error during Data Source initialization:', err)
    })

const corsOptions = {
    origin: [String(process.env.CLIENT_HOST_URL)],
}

app.use(cors(corsOptions))
app.use('/static', express.static(savePath))
app.use(router)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_PORT}`)
})