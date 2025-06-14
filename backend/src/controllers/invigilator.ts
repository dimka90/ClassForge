import {Response, Request} from 'express';
import { createInvigilator } from '../db/invigilator';
import Invigilator from '../model/invigilator';


export async function invigilatorController(req: Request, res: Response): Promise<Response>{

const {name, email} = req.body;

if(!name || !email)
{

    return res.status(406).send({
        success: false,
        message: "Empty field are not allowed on name or email"
    })

}

try {


    let result = await createInvigilator({name, email});

    return res.status(200).send({
        success: true,
        message: "Successfully created new Invigilator",
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


export async function getAllInvigilatorsController(req: Request, res: Response) : Promise<Response> {

    try {

        let result =  await Invigilator.findAll()

        return res.status(200).send({
            success: true,
            message: "SUcccessfully retrived all Invigilators",
            data: result
        })
        
    } catch (error: any) {
        
        throw new Error(`Error: ${error.message}`)
    }
    
}