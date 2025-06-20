import studentmodel from "../model/studentmodel.js";
import { sendconfirm } from "../email.js";

//all students
export const Student =async (req, res) => {
  const students = await studentmodel.find();
  res.json(students);
}

//updating fee of specific
export const Studentfeeupdate = async (req, res) => {
  const { totalfee, dueAmount, dueDate } = req.body;
  const student = await studentmodel.findByIdAndUpdate(
    req.params.id,
    { totalfee, dueAmount, dueDate },
    { new: true }
  );
  await sendconfirm(student);
  res.send("fee updated and email sent.");
}

//create student 
export const createstudent =  async (req, res) => {
  try{
  const { name, email, totalfee, dueAmount, dueDate } = req.body;

  if (!name || !email) return res.status(400).send("Name and email required");

  const newStudent = await studentmodel.create({
    name,
    email,
    totalfee,
    dueAmount,
    dueDate,
    feeConfirmed: false
  });

  res.status(201).json(newStudent);}
  catch(error){
    return res.status(500).send("error",error);
  }
}