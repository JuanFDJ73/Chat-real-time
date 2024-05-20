import dotenv from "dotenv";
dotenv.config();
import { getImageDB } from "./userImage.js";

const database = process.env.DB_NAME

const getContactImg = async (req, res) => {
    try {
        const contact = req.body.contactId;
        const img = await getImageDB(contact);
        res.status(200).send({ image: img });
    } catch (error) {
        res.status(404).send("No se encontró la imagen del contacto");
    }
};

export {
    getContactImg
};