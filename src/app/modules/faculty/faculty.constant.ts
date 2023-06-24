export const facultyFilterableFields = [
  'searchTerm', // is connected to facultySearchableFields
  'id', // exact match {...filtersData}
  'gender',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
  'designation',
];

// Search term fields
export const facultySearchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
