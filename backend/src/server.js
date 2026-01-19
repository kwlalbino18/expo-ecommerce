import express from "express";
import path from "path";
import { ENV } from "./config/env.js";



const app = express();
const __dirname = path.resolve();
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" })
});


if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    // catch all routes and serve index.html
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "index.html", "dist"))
    })
}

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});


