import Elysia from "elysia";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TimelineService = new Elysia()
  .get("/api/post/show", async () => {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: true
      },
      take: 30
    })
  })

export default TimelineService