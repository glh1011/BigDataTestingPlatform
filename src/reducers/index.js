import { combineReducers } from 'redux';
import students from './student';
import teachers from './teacher';
import courseListses from './courseManagement';
import courseContentListses from './courseSchedule';

export default combineReducers({
  students,
  teachers,
  courseListses,
  courseContentListses,
});
