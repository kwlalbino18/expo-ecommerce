import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import dns from "node:dns/promises";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const __dirname = path.resolve();
dns.setServers(["1.1.1.1"]);

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" })
});


if (ENV.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../admin/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
    connectDB();
});


