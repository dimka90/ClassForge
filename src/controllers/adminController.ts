import { Request, Response } from "express";
import { createAdmin } from "../db/admin";

export async function createAdminController(req: Request, res: Response){

    const {username, password, email} = req.body;

    if(!username || !password ){

        return res.status(400).send({

            success: false,
            message: "Username or password can't be empty"
        });


    }
    try {


        let newAdmin =  await createAdmin(username, password, email);
        console.log()

    res.send({
        success: true,
        message: newAdmin
    })
        
    } catch (error) {

        let errorMessage = "Unknown error"
        
        if (error && typeof error === "object" && 'errors' in error && Array.isArray((error).errors as any)){

            errorMessage = (error as any).errors.map((element: any) => element.message).join(",");
        }
         res.send({
        success: true,
        message: errorMessage
    })
    }


}


export function getAllAdmin(req: Request, res: Response){

    res.send({
        success: true,
        message: "Welcome to the admin page"
    })
}
export function getAdmin(req: Request, res: Response){
    res.send({
        success: true,
        message: "All admin are returned"
    })

}