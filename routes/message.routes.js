import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";


dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

router.get('/api/mensajes', async function(req, res) {

});


export default router;