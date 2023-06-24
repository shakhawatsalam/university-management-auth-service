import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

// Get Single Admin
router.get('/:id', AdminController.getSingleAdmin);
// Delate Admin
router.delete('/:id', AdminController.deleteAdmin);
// Update Admin
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);
// Get All Admin
router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
