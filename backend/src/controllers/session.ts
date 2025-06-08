import {Response, Request} from 'express';
import { createInvigilator } from '../db/invigilator';
import Invigilator from '../model/invigilator';
import { createSession, getAllSession } from '../db/session';
import Session from '../model/session';



export async function sessionController(req: Request, res: Response): Promise<Response>{

const {name, startDate, endDate} = req.body;


console.log(
    "I am the value", name
)
if(!name || !startDate || !endDate)
{

    return res.status(406).send({
        success: false,
        message: "Empty field are not allowed on name or Date"
    })

}

try {


    let result = await createSession({name, startDate, endDate});

    return res.status(200).send({
        success: true,
        message: "Successfully created new Session",
        data: result
    })
}
catch ( error: any) {

 return res.status(400).send({
        success: true,
        message: `Error: ${error.message}`,
 
    })
}

}


export async function getAllSessionController(req: Request, res: Response) : Promise<Response> {

    try {

        let result =  await getAllSession();

        return res.status(200).send({
            success: true,
            message: "SUcccessfully retrived all Session",
            data: result
        })
        
    } catch (error: any) {
        
        throw new Error(`Error: ${error.message}`)
    }
    
}