import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import fishRoutes from './routes/fishes.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(cors())

app.use('/fishes', fishRoutes)

app.get('/', (req, res) => {
    res.send('welcome')
})

const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', true)
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server runnning on port: http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message))
