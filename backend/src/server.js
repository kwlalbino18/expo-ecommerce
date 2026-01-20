import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import dns from "node:dns/promises";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();
const __dirname = path.resolve();
dns.setServers(["1.1.1.1"]);


app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions: functions }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" })
});


if (ENV.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../admin/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}

const startServer = async () => {
    app.listen(ENV.PORT, () => {
        console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
        connectDB();
    });

}

startServer();


