import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { deleteMessage, updateMessage } from "../database/message.js";


dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/update-message', updateMessage);

router.delete('/api/delete-message', deleteMessage);


export default router;