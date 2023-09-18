import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/Apierror';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constans';
import {
  AcademicFacultyCreatedEvent,
  AcademicFacultyUpdatedEvent,
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// CREATE FACULTY SERVICE
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  // Check if a faculty with the same identifier already exists
  const existingFaculty = await AcademicFaculty.findOne({
    title: payload.title,
  });
  if (existingFaculty) {
    // Return early if a duplicate entry is found
    throw new ApiError(
      httpStatus.CONFLICT,
      'A faculty with the same title already exists.'
    );
  }
  const result = await AcademicFaculty.create(payload);
  return result;
};

// GET SINGLE FACULTY SERVICE
const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// UPDATE SINGLE FACULTY SERVICE
const updateFaculty = async (
  id: string,
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const getAllFaculty = async (
  filters: Partial<IAcademicFacultyFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const insertIntoDBFromEvent = async (e: AcademicFacultyCreatedEvent) => {
  await AcademicFaculty.create({
    title: e.title,
    syncId: e.id,
  });
};
const updateIntoDBFromEvent = async (e: AcademicFacultyUpdatedEvent) => {
  await AcademicFaculty.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: {
        title: e.title,
      },
    }
  );
};

const deleteOneintoDBFromEvent = async (
  e: AcademicFacultyUpdatedEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndDelete({
    syncId: e.id,
  });
};

export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculty,
  insertIntoDBFromEvent,
  updateIntoDBFromEvent,
  deleteOneintoDBFromEvent,
};
