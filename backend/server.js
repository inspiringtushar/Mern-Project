const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("API is running!!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/note/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
