import express from "express"
import { adminProductRouter } from "./routes/admin/products";
import { userProductRouter } from "./routes/users/products";
import { PORT } from "../apiconfig";
import { authRouter } from "./routes/users/auth";
import cors from "cors"
import { cartRouter } from "./routes/users/cart"
import { checkoutRouter } from "./routes/users/checkout"
import cookieParser from "cookie-parser"

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true // this is needed to allow cookies or auth headers
};

const app = express()

// config middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

// route middlewares
app.use(adminProductRouter)
app.use(userProductRouter)
app.use(authRouter)
app.use(cartRouter)
app.use(checkoutRouter)

app.listen(PORT, async () => {
    console.log('express app started');
    
})

export default app;