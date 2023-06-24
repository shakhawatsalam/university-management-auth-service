import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

// Creating Student
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

// Creating Faculty
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodValidation),
  UserController.createFaculty
);

export const UserRoute = router;
