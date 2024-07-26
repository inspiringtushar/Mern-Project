const express = require("express");
const notes = require("./data/notes.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
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
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
