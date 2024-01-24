import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes/routes";

dotenv.config()

AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized');
}).catch(error => console.log(error));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({origin : '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', router)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});
