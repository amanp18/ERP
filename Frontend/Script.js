
const backend = 'https://erp-74ez.onrender.com';

const login= async()=> {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await fetch(`${backend}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    })
    .then(data => {
      if (data.token) {
        alert("Login successful");
        localStorage.setItem("token", data.token);
        document.getElementById("main").style.display = "block";
        document.getElementById("maintoo").style.display = "block";
        loadStudents();
      }
    })
    .catch(err => {
      alert("Login failed: " + err.message);
    });
}


const loadStudents=async()=> {
  await fetch(`${backend}/admin/students`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }})
.then(res => res.json())
    .then(students => {
      const container = document.getElementById("students");
      container.innerHTML = "";
      students.forEach(s => {
        container.innerHTML += `
          <div class="student-card">
            <b>${s.name}</b> (${s.email})<br/>
            💰 Total Fee: ₹${s.totalfee} | Due: ₹${s.dueAmount} <br/>
            📅 Due Date: ${new Date(s.dueDate).toLocaleDateString()}<br/>
            ✅ Confirmed: ${s.feeConfirmed ? "Yes" : "No"} <br/>
            🆔 ID: <code>${s._id}</code><br/>
            <button class="update-btn" onclick='prefillUpdate(${JSON.stringify(s)})'>Update Fee</button>
          </div>`;
      });
    });
}


const prefillUpdate= (student)=> {
  document.getElementById("studentId").value = student._id;
  document.getElementById("totalfee").value = student.totalfee;
  document.getElementById("dueAmount").value = student.dueAmount;
  document.getElementById("dueDate").value = student.dueDate.split("T")[0];
  document.getElementById("selectedName").innerText = student.name;
}

const updateFee= async()=> {
  const id = document.getElementById("studentId").value;
  const totalfee = document.getElementById("totalfee").value;
  const dueAmount = document.getElementById("dueAmount").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!id) return alert("Select a student to update first.");

 await fetch(`${backend}/admin/student/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ totalfee, dueAmount, dueDate })
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      document.getElementById("selectedName").innerText = "[none]";
      document.getElementById("studentId").value = "";
      document.getElementById("totalfee").value = "";
      document.getElementById("dueAmount").value = "";
      document.getElementById("dueDate").value = "";
      loadStudents();
    });
}
const createStudent= async() =>{
  const name = document.getElementById("newName").value;
  const email = document.getElementById("newEmail").value;
  const totalfee = document.getElementById("newTotalfee").value;
  const dueAmount = document.getElementById("newDueAmount").value;
  const dueDate = document.getElementById("newDueDate").value;

  if (!name || !email) return alert("Name and email are required");

 await fetch(`${backend}/admin/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ name, email, totalfee, dueAmount, dueDate })
  })
    .then(res => res.json())
    .then(data => {
      alert("Student created successfully!");
      loadStudents();
      // Clear fields
      document.getElementById("newName").value = "";
      document.getElementById("newEmail").value = "";
      document.getElementById("newTotalfee").value = "";
      document.getElementById("newDueAmount").value = "";
      document.getElementById("newDueDate").value = "";
    });
}
