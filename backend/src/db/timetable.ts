import { TimeTableDetails } from "../types/timetable";
import TimeTable  from "../model/timetable"
import { time } from "console";
export async function createTimeTable(timetable: TimeTableDetails) {
    const {sessionId, level} = timetable;
    let newTimetable = await TimeTable.findOne(

        {
            where: {
                sessionId
            }
        }
    )

    if(newTimetable) {

        throw new Error("Session Already exist");
    }

    try {
        let result = await TimeTable.create({
        sessionId,
        level
    })
    return result
    } catch (error: any) {

        throw new Error(`Error: ${error.message}`)
        
    }

    
}

export async function getAllTimetable(){
 
    try {
        
         let alltimetables = await TimeTable.findAll();

         return alltimetables
    } catch (error:any) {

        throw new Error(`Error: ${error.message}`)
        
    }
   
}