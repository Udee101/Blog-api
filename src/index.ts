import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized');
}).catch(error => console.log(error));

const PORT = 3000;
const app = express();

app.use(cors({origin : '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(PORT);
