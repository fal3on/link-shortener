import { PrismaClient } from "@prisma/client";

// return content of table called Link with all columns and rows
export default async  (req, res) => {
    const prisma = new PrismaClient();
    const data = await prisma.link.findMany();
    res.status(200).send(data);
}