import { initializeApp , applicationDefault } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from 'firebase-admin/storage';
import dotenv from "dotenv";
dotenv.config();

initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET
})

const db = getFirestore();
const storage = getStorage();

export {db, storage};