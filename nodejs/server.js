const express = require("express");
const cors = require("cors");
const connectionDB = require("./config/db.config");
const appRouter = require("./route/app");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ]
}));
app.use("/uploads", express.static("uploads"));
connectionDB();
app.use("/api/v1", appRouter);
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});