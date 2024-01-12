import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
// restfullapi jaha banengi wo js file import kari hai
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config();

const app = express();
import fileupload from 'express-fileupload' 

app.use(fileupload({useTempFiles: true}))
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// creating restapi end points for the post/dalle routes
app.use("/api/v1/posts",postRoutes)
app.use("/api/v1/dalle",dalleRoutes)


app.get("/", async (req, res) => {
  res.send("hello from server dall e");
});

connectDB(process.env.MONGODB_URL);
app.listen("8080", () => {
  console.log("server started at port 8080 !");
});
