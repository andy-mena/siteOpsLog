import express, {Express} from "express"
import cors from "cors";
import colors from "colors";
import { connectDB } from "./config/database";
import dotenv from "dotenv";
import morgan from "morgan";
import {corsConfig} from "./config/cors"
import userRoute from "./routes/userRoute";
import sitesRoute from "./routes/sitesRoute";
import workReportRoute from "./routes/workReportRoute";

dotenv.config();
connectDB();

const server: Express = express();
server.use(express.json());
server.use(cors(corsConfig));
server.use(morgan("dev"));


server.use("/api/v1/user", userRoute); //route for users
server.use("/api/v1/site", sitesRoute); //route for sites
server.use("/api/v1/work-report", workReportRoute); //route for work reports

export default server;