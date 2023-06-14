import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

// Create Department
router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);

// Get Single Department
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

// Update Department
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

// Delete Department
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

// Get all Department Pagination And Search Terms And Filtering
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRoutes = router;
