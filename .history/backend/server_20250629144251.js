const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allow only specific frontend origins (Render + localhost)
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Backend API is running ✅");
});

app.use("/api/data", require("./routes/data"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
