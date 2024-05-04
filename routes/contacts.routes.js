import express from "express";
import { contactButtonClick, findContactId, searchContacts} from "../database/contact.js";

const router = express.Router();

router.post('/api/contact-button', contactButtonClick);

router.get('/api/searchContacts', searchContacts);

router.post('/api/find-contact', findContactId);

export default router;