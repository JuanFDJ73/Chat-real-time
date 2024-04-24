import express from "express";
import { deleteCookieContact, setContactId, verifyContactId } from "../database/cookieContactId.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router(); 

router.post('/api/set-contact-id', setContactId);

router.get('/api/verify-contact-id', verifyContactId);

router.get('/api/delete-cookie-contact', deleteCookieContact);

export default router;
