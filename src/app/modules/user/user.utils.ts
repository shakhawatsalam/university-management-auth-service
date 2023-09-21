// find the last IdNumber from  database

import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Generate Student Unique Id
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // incremnet by 1
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedID = `${academicSemester?.year.toString().substring(2)}${
    academicSemester?.code
  }${incrementedID}`;
  return incrementedID;
};

// Generate Faculty Unique id
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedID = `F-${incrementedID}`;

  return incrementedID;
};

// Generate Admin Unique ID

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedID = `A-${incrementedID}`;
  return incrementedID;
};
