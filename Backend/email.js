import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth:{
        user:  process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
  }
})
export const sendconfirm = async(student)=>{
    const yes = `https://erp-74ez.onrender.com/confirm-fee?student_id=${student._id}&response=yes`
    const no = `https://erp-74ez.onrender.com/confirm-fee?student_id=${student._id}&response=no`

    await transporter.sendMail({
        from: 'amanpratap9868@gmail.com',
        to: student.email,
        subject: "Fee Submission Confirmation",
        html:`
        <p> Dear ${student.name},<p>   <p>Your updated fee due is Rs.${student.dueAmount}. Please confirm whether you have submitted the fees.</p>
      <p>
        Yes: <a href="${yes}">${yes}</a><br/>
        No: <a href="${no}">${no}</a>
      </p>
    `
    })
} 