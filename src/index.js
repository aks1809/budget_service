import express from "express";
import APIRoutes from "./routes/index.js";
import middlewares from "./middleware/index.js"

const app = express();
middlewares(app);
app.use("/api", APIRoutes);

app.listen("9000", (err) => {
    console.log("API Server listening on port 9000");
});