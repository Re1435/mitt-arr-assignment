const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
app.use(express.json());
const PORT = 3001 || process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  });

app.use("/auth", userRoutes);
app.use("/bookmark", bookmarkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
