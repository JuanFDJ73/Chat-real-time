import express from "express";
import contactsRoutes from "./contacts.routes.js";
import cookieContactRoutes from "./cookieContact.routes.js";
import cookieUserRoutes from "./cookieUser.routes.js";
import descriptionRoutes from "./description.routes.js";
import imageRoutes from "./image.routes.js";
import messageRoutes from "./message.routes.js";
import userName from "./userName.routes.js";
import userNick from "./userNick.routes.js";

const router = express.Router(); 

router.use(contactsRoutes);
router.use(cookieContactRoutes);
router.use(cookieUserRoutes);
router.use(descriptionRoutes);
router.use(imageRoutes);
router.use(messageRoutes);
router.use(userName);
router.use(userNick);

export default router;
