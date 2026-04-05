const express = require("express");
const cors = require("cors");

const petRoutes = require("./routes/petRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ MIDDLEWARE — MUST BE HERE
app.use(cors());
app.use(express.json());

// ✅ ROUTES AFTER MIDDLEWARE
app.use("/api", petRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
