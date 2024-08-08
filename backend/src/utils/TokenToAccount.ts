import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function tokenToAccount(jwt: any, token: string) {
  let payload;
  try {
    payload = await jwt.verify(token);
  } catch (error: any) {
    throw new Error("Token validation failed: " + error.message);
  }

  if (!payload) {
    throw new Error("Token not valid");
  }

  const account = await prisma.account.findUnique({
    "where": {
      username: payload.username
    },
    "include": {
      user: true
    }
  })

  if (account) {
    return account
  } else {
    throw new Error("Account not found: " + payload.username);
  }
}

export { tokenToAccount };