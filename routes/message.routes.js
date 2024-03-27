import express from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post('/api/', function(req, res) {
    const token = req.cookies.jwtChatOp;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;
});


export default router;