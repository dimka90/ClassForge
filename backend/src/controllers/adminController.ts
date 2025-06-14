import { Request, Response } from "express";
import { createAdmin } from "../db/admin";
import { adminlogin } from "../db/adminlogin";
import { createToken } from "../utils/createJwttoken";
export async function createAdminController(
  req: Request,
  res: Response
): Promise<Response> {
  const { username, password, email } = req.body;

  // Dimka, kar ka matan ka validate username length

  if (!username || !password || !email) {
    return res.status(400).send({
      success: false,
      message: "Username or password or email can't be empty",
    });
  }
  try {
    let newAdmin = await createAdmin(username, password, email);

    return res.status(201).send({
      success: true,
      message: "Admin successfully registered",
      data: newAdmin,
    });
  } catch (error) {
    let errorMessage = "Unknown error";

    if (
      error &&
      typeof error === "object" &&
      "errors" in error &&
      Array.isArray(error.errors as any)
    ) {
      errorMessage = (error as any).errors
        .map((element: any) => element.message)
        .join(",");

      return res.status(404).send({
        success: false,
        message: errorMessage,
      });
    }

    return res.send({
      success: true,
      message:
        typeof (error as any).message === "string"
          ? (error as any).message
          : "unknown error",
    });
  }
}

export function getAllAdmin(req: Request, res: Response) {
  return res.send({
    success: true,
    message: "All Admin are returned",
  });
}


export function getAdmin(req: Request, res: Response) {
  return res.send({
    success: true,
    message: "An admin is returned",
  });
}


// login

export async function adminloginController(req: Request, res: Response): Promise<Response>{
const {identifier, password} = req.body;

if(!identifier || !password) {
 return   res.status(400).send({
        message:"Email, username  or Password can't be empty"
    })
}
let loginData = await  adminlogin(identifier, password);
if(loginData.success) {
//generate token
const {id, username, email} = loginData.data;
let userToken = await createToken({
  id,
   email,
  username,
 
});
  return res.status(200).send({
success: true,
message:" User successfully login ",
data: userToken
}
)
}
return res.status(200).send({
success: false,
message:loginData.message
})

}