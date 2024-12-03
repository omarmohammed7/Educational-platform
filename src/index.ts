import express, { Application, Request, Response, NextFunction } from "express";
import http, { Server } from "http";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import errorHandel from "./middelware/errorHandel";

dotenv.config()

const app: Application = express();
const server: Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);
const PORT = process.env.PORT as string;

app.use(helmet());
app.use(morgan("combined"))
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("not found");
    (error as any).status = 404;
    next(error)
})

app.use(errorHandel)

server.listen(PORT, () => {
    console.log('server is running on', PORT);
})



