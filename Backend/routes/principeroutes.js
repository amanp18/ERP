import express from "express";
import { Loginprinciple } from "../Controller/auth.js";
import { createstudent, Student, Studentfeeupdate } from "../Controller/principle.js";
import { isPrincipal, verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/login", Loginprinciple);

//all students
router.get("/students",verifyToken, isPrincipal, Student );

//updating fee of specific
router.post("/student/:id",verifyToken, isPrincipal, Studentfeeupdate);

//student create 
router.post("/add-student",verifyToken, isPrincipal, createstudent)

export default router;
