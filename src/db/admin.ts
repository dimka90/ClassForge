import Admin from "../model/admin";

export async function createAdmin(username: string, password: string, email: string){
// check to see if a user exisit with this username
try {

    let user = await Admin.findOne({
    where: {username}
});

console.log(user)

if(user){

    throw new Error("Admin Already exist")
}

let newuser = await Admin.create({
    username,
    password,
    email
})

console.log( "i ma the error")

return newuser

    
} catch (error) {
    
    throw error
}

}