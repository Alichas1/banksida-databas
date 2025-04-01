import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3001;

//middleware
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  user: "root",
  password: "root",
  host: "localhost",
  database: "banksida",
  port: "8889",
});

app.use(cors());
app.use(bodyParser.json());

//skapar användaren
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

app.post("/users", async (req, res) => {
  console.log("req.body", req.body);
  const { username, password } = req.body;

  //try {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  const params = [username, password];
  const result = await query(sql, params);
  console.log("result", result);
  const userId = result.insertId;
  const balanceSql = "INSERT INTO balances (user_id, amount) VALUES (?, ?)";
  await query(balanceSql, [userId, 0]);
  res.status(201).send("User created");

  // } catch (error) {
  //   res.status(500).send("Error creating user");
  // }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to find the user by username
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const [result] = await query(sql, [username, password]);
    console.log("SQL Query Result:", result);

    if (result) {
      const user = result;
      const otp = Math.floor(100 + Math.random() * 9000);
      const sessionSql = "INSERT INTO session (user_id, otp) VALUES (?,?)";
      await query(sessionSql, [user.id, otp]);

      res.json({ otp });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).send("Error creating session");
  }
});

app.post("/sessions", async (req, res) => {
  const { otp } = req.body;
  try {
    const sessionSql = "SELECT * FROM sessions WHERE otp = ?";
    const [sessions] = await query(sessionSql, [otp]);
    if (sessions) {
      const session = sessions;
      const userId = session.user_id;
      const balanceSql = "SELECT * FROM balances WHERE user_id = ?";
      const [balances] = await query(balanceSql, [userId]);
      if (balances) {
        const balance = balances;
        res.json({ amount: balance.amount });
      } else {
        res.status(400).json({ message: "Balance not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).send("Error fetching account");
  }
});
app.post("/me/accounts/transactions", async (req, res) => {
  const { otp, amount } = req.body;
  try {
    const sessionSql = "SELECT * FROM session WHERE otp = ?";
    const [sessions] = await query(sessionSql, [otp]);
    if (sessions) {
      const session = sessions;
      const userId = session.user_id;
      console.log("userId", userId);
      const balanceSql = "SELECT * FROM balances WHERE user_id = ?";
      const [balances] = await query(balanceSql, [userId]);
      console.log("balances", balances);
      if (balances) {
        const balance = balances;
        const newAmount = balance.amount + amount;
        const updateBalanceSql =
          "UPDATE balances SET amount = ? WHERE user_id = ?";
        await query(updateBalanceSql, [newAmount, userId]);
        res.json({ balance: newAmount });
      } else {
        res.status(400).json({ message: "Balance not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error with transaction:", error);
    res.status(500).send("Error with transaction");
  }
});

// //login som chekar array
// app.post("/sessions", (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     const otp = Math.floor(10000 + Math.random() * 900000);
//     sessions.push({ id: sessionIds++, userId: user.id, otp });
//     res.json({ otp });
//   } else {
//     res.status(400).json({ message: "invalid credentials" });
//   }
// });

// //kollar på kontots summa
// app.post("/accounts", (req, res) => {
//   const { otp } = req.body;

//   const session = sessions.find((session) => session.otp === parseInt(otp));

//   if (session) {
//     const userId = session.userId;
//     const balance = balances.find((balance) => balance.userId === userId);

//     if (balance) {
//       res.json({ amount: balance.amount });
//       res.status(400).json({ message: "Balance not found" });
//     }
//   } else {
//     res.status(400).json({ message: "Invalid OTP" });
//   }
// });

// //skickar pengar till användarkonto
// app.post("/me/accounts/transactions", (req, res) => {
//   const { otp, amount } = req.body;

//   const session = sessions.find((s) => s.otp === parseInt(otp));

//   if (!session) {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   const balance = balances.find((balance) => balance.userId === session.userId);

//   if (!balance) {
//     return res.status(400).json({ message: "Balance not found" });
//   }

//   balance.amount += amount;

//   res.json({ amount: balance.amount });

//   console.log("balance:", balance);
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
