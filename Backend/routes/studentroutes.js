import express from 'express'
import { confirmfee } from '../Controller/student.js';
const router = express.Router();


router.get("/confirm-fee",confirmfee );

export default router