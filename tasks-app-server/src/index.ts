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
});

app.post("/api/tasks", async (req, res) => {
    const {title, content} = req.body;

    const task = await prisma.task.create({
        data: {title, content},
    });

    res.status(201).json(task);
});

app.listen(5000, ()=>{
    console.log("Server running on localhost:5000")
})

