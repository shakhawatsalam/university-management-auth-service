import InitAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.event';
import InitAcademicFaculty from '../modules/academicFaculty/academicFaculty.events';
import InitAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';

const subscribeToEvents = () => {
  InitAcademicSemesterEvents();
  InitAcademicFaculty();
  InitAcademicDepartmentEvents();
};

export default subscribeToEvents;
