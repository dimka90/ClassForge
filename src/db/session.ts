import { Op } from "sequelize";
import Invigilator from "../model/invigilator";

import { SessionDetails } from "../types/sessiondetails";
import Session from "../model/session";
export async function createSession(session: SessionDetails) {

    const {name, startDate, endDate} = session;
    // check for that invigilator first

    console.log(name)

    try {

        let newSession= await Session.findOne({

        where: {
           name
        }

    })

    if(newSession){

        throw new Error("Seesion already exits")
    }

    // create new invigilator

    let result = await Session.create({
        name,
        startDate,
        endDate
    })

    return result
    
        
    } catch (error: any) {

        throw new Error(`Error ${error.message}`)
        
    }
    
}

export async function getAllSession() {

    try {

        let allSession = await Session.findAll();

        return  allSession
        
    } catch (error: any) {
        
        throw new Error(`Error: ${error.message}}`)
    }

    
    
}