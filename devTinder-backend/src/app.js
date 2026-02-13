const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


// Connect to database and start the server
connectDB().then(() => {
        console.log("Database connected");
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        console.error("Error in connecting to database", err);
    });
