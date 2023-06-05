import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHnadler';
import { UserRoute } from './app/modules/user/user.route';
const app: Application = express();

// cors
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use('/api/v1/users/', UserRoute);
// Testing
// app.get('/', async (req: Request, res: Response) => {
//   console.log(x);
// });

// Global Error Handler
app.use(globalErrorHandler);

export default app;
