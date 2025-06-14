export interface TimetableItemDetails {
  timetableId: number;
  courseId: number;
  hallId: number;
  invigilatorId: number;
  date: string;        // format: 'YYYY-MM-DD'
  startTime: string;   // format: 'HH:mm:ss' or 'HH:mm'
  endTime: string;     // format: 'HH:mm:ss' or 'HH:mm'
}
