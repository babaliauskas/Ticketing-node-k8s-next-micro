import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@babaliauskas-tickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { getAllTicketsRouter } from "./routes/getAll";
import { updateTicket } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(getAllTicketsRouter);
app.use(updateTicket);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
