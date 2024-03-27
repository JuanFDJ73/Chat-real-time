import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/prueba', function(req, res) {
    try{
        const token = req.cookies.jwtChatOp;
        const contactId = req.body.contactId
    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;
        console.log('Prueba api, userid',userId , 'contacId', contactId);
        res.status(contactId)
    } catch(error){
        res.status(400).send('api, funcionando');
    }
});

export default router;