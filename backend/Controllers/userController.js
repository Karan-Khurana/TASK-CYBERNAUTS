const conn = require("../config/db");
const bcrypt = require("bcrypt");
const db = conn();

const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;
  try {
    if (firstName && lastName && email && userName && password) {
      db.query(
        `SELECT * FROM user where email = ?`,
        [email],
        async (error, result) => {
          if (error) throw error;
          if (result.length > 0) {
            return res
              .status(400)
              .json({ error: "User with this email already exists." });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
              `INSERT INTO user (firstName, lastName, email, userName, password) VALUES (?, ?, ?, ?, ?)`,
              [firstName, lastName, email, userName, hashedPassword],
              (error, result) => {
                if (error) throw error;
                return res
                  .status(200)
                  .json({ message: "User registered successfully." });
              }
            );
          }
        }
      );
    } else {
      throw new Error("All fields are required.");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    db.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      async (error, result) => {
        if (error) throw error;

        if (result.length === 0) {
          return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid email or password." });
        }

        return res.status(200).json({ ...user, password: "" });
      }
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, authUser };
