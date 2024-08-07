import Elysia from "elysia";
import { PrismaClient, Account } from '@prisma/client'

import { tokenToAccount } from "../utils/TokenToAccount";

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXP = 5 * 60
const REFRESH_TOKEN_EXP = 30 * 86400

function getExpTimestamp(seconds: number) {
  const currentTimeMillis = Date.now();
  const secondsIntoMillis = seconds * 1000;
  const expirationTimeMillis = currentTimeMillis + secondsIntoMillis;

  return Math.floor(expirationTimeMillis / 1000);
}

const AccountService = new Elysia()
  .post("/api/signup", async ({ body }: any) => {
    // ユーザー名の重複確認
    if (await prisma.account.findUnique({ where: { username: body.username } })) {
      return {"status": "error", "message": "Username is already taken."}
    }
  
    // メールの重複確認
    if (await prisma.account.findUnique({ where: { email: body.email } })) {
      return {"status": "error", "message": "Email is already in use."}
    }
  
    // TODO: メール確認
  
    const account = await prisma.account.create({
      data: {
        username: body.username,
        email: body.email,
        password: await Bun.password.hash(body.password),
        createdAt: new Date()
      }
    })

    const user = await prisma.user.create({
      data: {
        acct: `@${body.username}@tinyap.instance`,
        displayName: body.username,
        createdAt: new Date()
      }
    })

    await prisma.account.update({
      where: {
        id: account.id
      },
      data: {
        userId: user.id
      }
    })
  
    return {"status": "ok"}
  })
  
  .post("/api/login", async ({ jwt, body, cookie }: any) => {
    const { accessToken, refreshToken } = cookie

    const loginTarget: Account | null = await prisma.account.findUnique({ where: { username: body.username } })
  
    // アカウントの存在確認
    if (!loginTarget) {
      return {"status": "error", "message": "Account not found"}
    }
  
    // パスワードの検証
    if (loginTarget && await Bun.password.verify(body.password, loginTarget?.password)) {
      // JWT発行
      const accessJWTToken: string = await jwt.sign({
        username: body.username,
        type: "access",
        exp: getExpTimestamp(ACCESS_TOKEN_EXP)
      })
      accessToken.set({
        value: accessJWTToken,
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXP,
        path: "/"
      })

      const refreshJWTToken: string = await jwt.sign({
        username: body.username,
        type: "refresh",
        exp: getExpTimestamp(REFRESH_TOKEN_EXP)
      })
      refreshToken.set({
        value: refreshJWTToken,
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXP,
        path: "/"
      })

      await prisma.account.update({
        "where": {
          username: body.username,
        },
        "data": {
          refreshToken: refreshJWTToken
        }
      })
    
      return {"status": "ok", "accessToken": accessJWTToken, "refreshToken": refreshJWTToken}
    } else {
      return {"status": "error", "message": "Incorrect password"}
    }
  })

  .post("/api/refresh", async ({ jwt, cookie, set }: any) => {
    const { accessToken, refreshToken } = cookie

    if (!refreshToken.value) {
      set.status = "Unauthorized"
      throw new Error("Refresh token is missing");
    }

    let refreshTokenPayload;
    try {
      refreshTokenPayload = await jwt.verify(refreshToken.value);
    } catch (error) {
      set.status = "Forbidden";
      throw new Error("Invalid refresh token");
    }

    const account = await prisma.account.findUnique({
      where: {
        username: refreshTokenPayload.username
      }
    })

    if (!account) {
      set.status = "Forbidden"
      throw new Error("Refresh token is invalid");
    }

    // JWT発行
    const accessJWTToken: string = await jwt.sign({
      username: refreshTokenPayload.username,
      type: "access",
      exp: getExpTimestamp(ACCESS_TOKEN_EXP)
    })
    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      path: "/"
    })

    const refreshJWTToken: string = await jwt.sign({
      username: refreshTokenPayload.username,
      type: "refresh",
      exp: getExpTimestamp(REFRESH_TOKEN_EXP)
    })
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXP,
      path: "/"
    })

    await prisma.account.update({
      "where": {
        username: refreshTokenPayload.username,
      },
      "data": {
        refreshToken: refreshJWTToken
      }
    })

    return {"status": "ok", "accessToken": accessJWTToken, "refreshToken": refreshJWTToken}
  })

  .post("/api/logout", async ({ jwt, cookie }: any) => {
    const { accessToken, refreshToken } = cookie

    const accessTokenPayload = await jwt.verify(accessToken.value)

    accessToken.remove();
    refreshToken.remove();

    await prisma.account.update({
      where: {
        username: accessTokenPayload.username
      },
      data: {
        refreshToken: null
      }
    })

    return {"status": "ok"}
  })
  
  .get("/api/who_am_i", async ({ jwt, cookie, set }: any) => {
    const { accessToken } = cookie
    if (!accessToken.value) {
      set.status = "Unauthorized"
      return {"message": "Access token is missing"}
    }

    const account = await tokenToAccount(jwt, accessToken.value)
    return {"username": account?.username}
  })

export default AccountService