import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

// Create Student account
const createStudent = catchAsync(async (req: Request, res: Response) => {
  // creating user
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
  // next();
});

// Create Faculty account
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...facultyData } = req.body;
  // console.log(faculty, ...facultyData, 'Student created successfully');
  const result = await UserService.createFaculty(faculty, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
