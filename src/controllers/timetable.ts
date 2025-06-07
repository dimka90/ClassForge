import { Request, Response } from "express";
import { createTimeTable } from "../db/timetable";
import { createSession } from "../db/session";
import { getAllTimetable } from "../db/timetable";
export async function timeTableController(req: Request, res: Response): Promise<Response> {
    const {name, startDate, endDate,  level} = req.body

    if(!name || !startDate || !endDate || !level)
{

    return res.status(406).send({
        success: false,
        message: "Empty field are not allowed on name or Date or level"
    })

}


    try {
        let result = await createSession({name, startDate, endDate});

    let sessionId = result["dataValues"].id;
    let newTimetable = await createTimeTable({sessionId, level})

    // console.log(newTimetable)

      return res.status(201).send({
        success: true,
        message: "Timetable successfully created",
        data: newTimetable
    })
     
    } catch (error:any) {
       
        
        return res.status(400).send({
        success: false,
        message: error.message || "Unkown error",
    })

    }
    
   
}

export async function getAllTimetableController(req: Request, res: Response): Promise<Response>{

    try {
        
          let result = await getAllTimetable();
          return res.status(206).send({
            success: true,
            message: "Successfully retrived all timetable",
            data: result
          })
    } catch (error:any) {

        throw new Error(`Error: ${error.messgae}`)
        
    }

  
}
    
