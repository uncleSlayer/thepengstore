import express from "express"
import { adminProductRouter } from "./routes/admin/products";
import { userProductRouter } from "./routes/users/products";
import { PORT } from "../apiconfig";

const app = express()
app.use(express.json())

app.use(adminProductRouter)
app.use(userProductRouter)

app.listen(PORT, () => console.log(`express server is listening on port: ${PORT}`))

export default app;