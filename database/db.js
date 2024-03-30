import { initializeApp , applicationDefault } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
dotenv.config();

initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.DATABASE_URL
})

const db = getFirestore();

export default db;