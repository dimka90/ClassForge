import TimetableItem from "../model/timetableitem";
import { TimetableItemDetails } from "../types/timtableItems";

export async function createTimetableItem(items: TimetableItemDetails) {

    const {
         timetableId,
      courseId,
      hallId,
      invigilatorId,
      date,
      startTime,
      endTime,
    } = items;
    try {
  
    const item = await TimetableItem.create({
      timetableId,
      courseId,
      hallId,
      invigilatorId,
      date,
      startTime,
      endTime,
    });

    return item

}
catch (error:any){

    throw new Error(`Error: ${error.message}}`)
}
}



export async function getAllTimetableItems(){
 
    try {
        
         let alltimetables = await TimetableItem.findAll();

         return alltimetables
    } catch (error:any) {

        throw new Error(`Error: ${error.message}`)
        
    }
   
}