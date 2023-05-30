import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

// cors
app.use(cors())

// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//
app.use('/api/v1/users/', usersRouter)
// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working successfully')
})

export default app
