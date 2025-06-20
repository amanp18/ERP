import jwt from 'jsonwebtoken'

export const Loginprinciple =  (req, res) => {
  try{
     const { username, password } = req.body;

  if (username === "principal" && password === "aman00") {
    const token = jwt.sign(
      { username, role: "principal" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    return res.json({ token });
  }
  }
catch(error){
  return res.status(401).send("Unauthorized",error);
}}
