import Admin from "../model/admin";
import { Op } from "sequelize";
import { verifypassword } from "../utils/hash";
export async function adminlogin(identifier: string, password: string): Promise<Object>{

    // Check for user in the db
    try {
        let user = await Admin.findOne(
            {
                where:{
                [Op.or]: [
                    
                    {email: identifier},
                    {username: identifier}
                ]
            }
        }
    )
    if (!user) {

        throw new Error(`${identifier} does not exist`)
    }
    

    console.log(user)
    let  hash_password = user['dataValues'].password;

    let isPasswordValid = await verifypassword(password, hash_password);

    if(isPasswordValid){

        return user['dataValues']

    }

    return {
        message: "Invalid Password"
    }
   

    } catch (error) {

        throw error
        
    }
    
}