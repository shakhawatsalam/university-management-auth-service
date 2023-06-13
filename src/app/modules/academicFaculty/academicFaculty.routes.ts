import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// Create Faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyControllers.createFaculty
);

// Get Single Faculty
router.get('/:id', AcademicFacultyControllers.getSingleFaculty);

// Update Faculty
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyControllers.updateFaculty
);

router.delete('/:id', AcademicFacultyControllers.deleteFaculty);

router.get('/', AcademicFacultyControllers.getAllFaculty);

export const AcademicFacultyRoutes = router;
