import express from "express"
import { adminProductRouter } from "./routes/admin/products";
import { userProductRouter } from "./routes/users/products";
import { PORT } from "../apiconfig";
import { authRouter } from "./routes/users/auth";
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true // this is needed to allow cookies or auth headers
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(adminProductRouter)
app.use(userProductRouter)
app.use(authRouter)

app.listen(PORT, () => console.log(`express server is listening on port: ${PORT}`))

export default app;