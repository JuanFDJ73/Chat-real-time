import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { uploadImage, upload, getUserImage} from "../database/image.js";
dotenv.config();

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/upload-image', upload.single('file'), uploadImage);

router.get('/api/get-user-image', getUserImage);

export default router;