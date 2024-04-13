import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY

export function verifyUserId(token){
    const verified = jwt.verify(token, secretKey);
    const userId = verified.userId;
    return userId
}

export function randomUserId(){
    const userId = "userIdprueba" //Sera una Id aleatoria
    return userId
}
