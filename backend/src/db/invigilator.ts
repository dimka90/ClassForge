import { Op } from "sequelize";
import Invigilator from "../model/invigilator";

import { InvigilatorDetails } from "../types/invigilatoredetails";
export async function createInvigilator(invigilator: InvigilatorDetails) {

    let {name, email} = invigilator;
    // check for that invigilator first

    try {

        let newInvigilator = await Invigilator.findOne({

        where: {
           name
        }

    })

    if(newInvigilator){

        throw new Error("InVigilator already exits")
    }

    // create new invigilator

    let result = await Invigilator.create({
        name,
        email
    })

    return result
    
        
    } catch (error: any) {

        throw new Error(`Error ${error.message}`)
        
    }
    
}

export async function getAllInvigilators() {

    try {

        let alInvigilators = await Invigilator.findAll();

        return  alInvigilators
        
    } catch (error: any) {
        
        throw new Error(`Error: ${error.message}}`)
    }

    
    
}