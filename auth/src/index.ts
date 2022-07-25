import express from 'express';

import {currentUserRouter} from "./routes/current-user";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/singin";

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})