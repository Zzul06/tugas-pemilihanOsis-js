import cors from "cors";
import AuthRoute from "../routes/AuthRoute.js";
import CaketwaRoute from "../routes/CaketwaRoute.js";
import FileUpload from "express-fileupload";
import express from "express";
import dotenv from "dotenv";
import { syncDataBase } from "../models/index.js";
dotenv.config();

const app = express();
syncDataBase();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(AuthRoute);
app.use(CaketwaRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});