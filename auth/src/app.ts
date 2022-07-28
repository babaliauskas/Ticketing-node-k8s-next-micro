import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/singin";
import { errorHandler, NotFoundError } from "@babaliauskas-tickets/common";

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

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);

export { app };
