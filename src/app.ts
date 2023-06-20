import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHnadler';
import routers from './app/routes';
const app: Application = express();

// cors
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// app.use('/api/v1/users/', UserRoute);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1/', routers);

// Testing
// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(httpStatus.CONFLICT, 'hello world');
// });

// Global Error Handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: ' API Not found',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   code: '01',
//   year: '2024',
// };

// const testId = async () => {
//   const testId = await generateStudentId(academicSemester);
//   console.log(testId);
// };

// testId();

export default app;
