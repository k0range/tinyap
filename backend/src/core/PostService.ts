import Elysia from "elysia";
import { PrismaClient } from '@prisma/client'

import { tokenToAccount } from "../utils/TokenToAccount";

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

  .post("/api/post/create", async ({ cookie, body, jwt, set }: any) => {
    const { accessToken } = cookie
    if (!accessToken.value) {
      set.status = "Unauthorized"
      return {"message": "Access token is missing"}
    }

    let account;
    try {
      account = await tokenToAccount(jwt, accessToken.value);
    } catch (error) {
      set.status = "Unauthorized";
      return {"message": "Invalid access token"};
    }

    if (account.user) {
      await prisma.post.create({
        data: {
          authorId: account.user.id,
          content: body.content,
          createdAt: new Date()
        }
      })
    }

    return {"status": "ok"}
  })

export default TimelineService