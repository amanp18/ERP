import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    secure: true,
    service: 'gmail',
    auth:{
        user: 'amanpratap9868@gmail.com',
        pass: 'dnth eihr qvip dubu'
    }
})
export const sendconfirm = async(student)=>{
    const yes = `http://localhost:3000/confirm-fee?student_id=${student._id}&response=yes`
    const no = `http://localhost:3000/confirm-fee?student_id=${student._id}&response=no`

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