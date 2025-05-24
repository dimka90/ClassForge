import bycrpt from 'bcrypt';

export async function hashpassword(password: string) : Promise<String>{
    const saltHash = 10;
    const hash_password = await bycrpt.hash(password, saltHash);
    return hash_password
} 

export async function verifypassword(inputPassword: string, hashedPassword: string): Promise<boolean>{

    return await bycrpt.compare(inputPassword, hashedPassword);
}