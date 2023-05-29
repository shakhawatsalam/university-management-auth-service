import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// cors
app.use(cors())

// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing
app.get('/', (req: Request, res: Response): void => {
  res.send('Working Successfully')
})

export default app
