import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constans';
import { AcademicFacultyService } from './academicFaculty.service';

const InitAcademicFaculty = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicFacultyService.insertIntoDBFromEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicFacultyService.updateIntoDBFromEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicFacultyService.deleteOneintoDBFromEvent(data);
  });
};

export default InitAcademicFaculty;
