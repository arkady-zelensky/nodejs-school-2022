import * as express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import { getConfig } from "./config";
import { usersRouter } from "./resources/users/users.controller";
import * as morgan from "morgan";
import { HttpError } from "http-errors";

export class UsersServer {
  private app: express.Express;

  start() {
    this.initServer();
    this.initConfig();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initConfig() {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });
  }

  initMiddlewares() {
    this.app.use(express.json({ limit: "500kb" }));
    this.app.use(morgan("common"));
  }

  initRoutes() {
    this.app.use("/api/v1/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use(
      (
        err: HttpError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const statusCode = err.status || 500;
        res.status(statusCode).send(err.message);
      }
    );
  }

  startListening() {
    const { port } = getConfig();
    this.app.listen(port, () => {
      console.log("Started listening on port", port);
    });
  }
}
