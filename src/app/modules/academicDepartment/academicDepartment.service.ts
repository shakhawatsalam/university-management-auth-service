import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentCreatedEvent,
  IAcademicDepartmentFilters,
  IAcademicDepartmentUpdatedEvent,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// Create Department
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

// Get Single Department
const getSingleAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

// Update Single Department
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

// Delete Academic Department
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

// Get all Department Pagination And Search Terms And Filtering
const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const addConditions = [];

  if (searchTerm) {
    addConditions.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    addConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    addConditions.length > 0 ? { $and: addConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createAcademicDepartmentFromEvent = async (
  e: IAcademicDepartmentCreatedEvent
) => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  await AcademicDepartment.create({
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  });
};

const updateIntoDBFromEvent = async (e: IAcademicDepartmentUpdatedEvent) => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });

  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDepartment.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: payload,
    }
  );
};

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};
export const AcademicDepartmentService = {
  createDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteDepartment,
  getAllDepartment,
  createAcademicDepartmentFromEvent,
  updateIntoDBFromEvent,
  deleteOneFromDBFromEvent,
};
