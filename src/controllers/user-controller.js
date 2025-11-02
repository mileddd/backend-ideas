import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from 'knex';
import knexConfig from '../../knexfile.js';
const knex = pkg.default;
const db = knex(knexConfig.development);

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db("users").where({ username }).first();
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password,user.password);    
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
