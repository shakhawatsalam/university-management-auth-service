import { Schema, Types, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const FacultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      unique: true,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
