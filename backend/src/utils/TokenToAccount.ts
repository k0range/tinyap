import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function tokenToAccount(jwt: any, token: String) {
  const payload = await jwt.verify(token)

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