import studentmodel from '../model/studentmodel.js';

export const confirmfee = async (req, res) => {
  const { student_id, response } = req.query;
  const confirmed = response === "yes";
  await studentmodel.findByIdAndUpdate(student_id, { feeConfirmed: confirmed });
  res.send(`<h2>Thanks! Your response '${response}' has been recorded.</h2>`);
}