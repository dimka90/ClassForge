import Admin from "../model/admin";
import { hashPassword, verifypassword } from "../utils/hash";
import { Op } from "sequelize";
export async function createAdmin(username: string, password: string, email: string){
// check to see if a user exisit with this username'
// also add email
try {

    let user = await Admin.findOne({
    where: {
    [Op.or]:
    [{username},
    {email}
    ]
    }
});

console.log("user",user)

if(user){

    throw new Error("Admin Already exist")
}

// hased user password

let hash_password = await hashPassword(password);
console.log(hash_password)
let newuser = await Admin.create({
    username,
    password: hash_password,
    email
})

console.log( "i ma the error")

return newuser

    
} catch (error) {
    
    throw error
}

}