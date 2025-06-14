import { HallDetails } from "../types/Halldetail";
import Hall from "../model/hall";
export async function createHall(hall: HallDetails) {

    let {name, capacity} = hall;
    // check for hall name 

    try {
            let newHall = await Hall.findOne({
        where: {
           name
        }
    })
    if(newHall) {
        throw new Error("Hall already exits")
    }

    let result = await Hall.create({
        name,
        capacity
    })

    

    return result
        
    } catch (error: any) {

        throw new Error(`Failed to create hall: ${error.message}`)
        
    }

}

export async function getallHalls() {


try {

    let result = await Hall.findAll();


    return result
    
} catch (error: any) {
    
    throw new Error(`Failed to fetch all halls ${error.message}`)
}
    
}