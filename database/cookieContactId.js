import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

export function verifyContactId(token){
    const verified = jwt.verify(token, secretKey);
    const contactId = verified.contactId;
    return contactId
}