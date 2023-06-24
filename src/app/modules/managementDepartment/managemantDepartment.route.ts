import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managemantDepartment.controller';
import { ManagementDepartmentValidation } from './managemantDepartment.validation';

const router = express.Router();

// create department
router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

// get single department

router.get('/:id', ManagementDepartmentController.getSingleDepartment);

// update single department
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);
// delete department
router.delete('/:id', ManagementDepartmentController.deleteDepartment);

// get All department
router.get('/', ManagementDepartmentController.getAllDepartments);

export const ManagementDepartmentRoutes = router;
