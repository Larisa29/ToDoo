import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())


app.get("/api/tasks", async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany();

    res.json(tasks);
});

app.post("/api/tasks", async (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
        //res.status(400).json({ error: "Title and content fields required." });
        res.status(400).send("Title and content fields required.");
        return;
    }

    try {
        const task = await prisma.task.create({
            data: { title, content },

        });

        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).send("oops I did it again..");
    }
});

app.put("/api/tasks/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).send("Id must be a valid number!!");
        return;
    }

    const existingTask = await prisma.task.findUnique({
        where: {
            id: id
        }
    })

    if (!existingTask) {
        res.status(404).send(`Task with id ${id} not found.`);
        return;
    }

    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).send("Title and content fields required.");
        return;
    }

    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: id
            },
            data: {
                title: title,
                content: content
            }
        });

        res.status(201).json(updatedTask);
    } catch (error) {
        res.status(500).send("ooops i did it again..");
    }
})

app.delete("/api/tasks/:id", async function (req: Request, res: Response){
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res.status(400).send("Id must be a valid number!!");
        return;
    }

    const existingTask = await prisma.task.findUnique({
        where: {
            id: id
        }
    })

    if (!existingTask) {
        res.status(404).send(`Task with id ${id} not found.`);
        return;
    }

    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: id
            }
        })

        res.status(204).send();
    } catch (error) {
        res.status(500).send("ooops i did it again..");
    }
})

app.listen(5000, () => {
    console.log("Server running on localhost:5000")
})

