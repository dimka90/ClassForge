import Admin from "../model/admin";
import { Op } from "sequelize";
import { verifypassword } from "../utils/hash";
import { LoginResponse } from "../types/adminloginResponse";
import { AdminDetails } from "../types/admindetails";
export async function adminlogin(
  identifier: string,
  password: string
): Promise<LoginResponse<AdminDetails>> {
  // Check for user in the db
  try {
    let user = await Admin.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });
    if (!user) {
      throw new Error(`${identifier} does not exist`);
    }

    console.log(user);
    let hash_password = user["dataValues"].password;

    let isPasswordValid = await verifypassword(password, hash_password);

    let  {id, email, username}=user["dataValues"];

    let admindetails  = {
        id,
        username,
        email
    }
    if (isPasswordValid) {
      return { success: true, data: admindetails};
    }

    return {
      success: false,
      message: "Invalid Password",
    };
  } catch (error) {
    throw error;
  }
}
