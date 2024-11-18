import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())


app.get("/api/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany();

    res.json(tasks);
})

app.listen(5000, ()=>{
    console.log("Server running on localhost:5000")
})

