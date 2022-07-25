import express from 'express';
import 'express-async-errors'
import mongoose from "mongoose";

import {currentUserRouter} from "./routes/current-user";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/singin";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.all('*', async (req, res, next) => {
    next(new NotFoundError())
})
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to mongoDB')
    } catch (err) {
        console.error("Error: ", err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!')
    })
}

start()