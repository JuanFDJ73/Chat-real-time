import dotenv from "dotenv";
import multer from 'multer';
dotenv.config();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB tamaño maximo
    }
});

export { upload };