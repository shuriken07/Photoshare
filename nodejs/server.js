const express = require("express");
const cors = require("cors");
const connectionDB = require("./config/db.config");
const appRouter = require("./route/app");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use("/uploads", express.static("uploads"));
connectionDB();
app.use("/api/v1", appRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});