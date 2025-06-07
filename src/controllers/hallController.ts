import { Request, Response} from "express";

import { createHall, getallHalls } from "../db/hall";
export async function createHallController(req: Request, res: Response) : Promise<Response>{
    
    const {
        name,
        capacity
    } = req.body;

    // validation

    if(!name || !capacity){
        return res.status(406).send({
            success: false,
            message: "Name or capacity can't be empty"
        })
    }

    try {

            let result = await  createHall( {name, capacity});

            return res.status(200).send({

                success: true,
                message: "hall succesfully created",
                data: result
            })

        
    } catch (error: any) {
        
        return res.status(400).send({

                success: false,
                message: error.message || "An error occurred"
    
            })

    }


    
}


export async function  getHallController(req: Request, res: Response) : Promise<Response> {

    try {
        

        let result =  await getallHalls();

        return res.status(200).send({
            success: true,
            message: "Successfully retrived all Halls",
            data: result
        })
    } catch (error: any) {
        
        return res.status(400).send({
            success: false,
            message: error.message || "An Error occurred"
        })
    }
    
}