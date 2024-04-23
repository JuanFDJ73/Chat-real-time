import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { db } from "../database/db.js";

dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

////////////////////////////////
const contactoPrueba = "contactoId"
////////////////////////////////

router.get('/api/name', async function(req, res) {

});


export default router;