import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "../database/db.js";
import { collection } from "firebase/firestore";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

////////////////////////////////
const contactoPrueba = "contactoId"
////////////////////////////////

router.get('/api/mensajes', async function(req, res) {

});


export default router;