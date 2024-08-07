import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function tokenToAccount(jwt: any, token: string) {
  const payload = await jwt.verify(token)

  if (!payload) {
    throw new Error("Token not valid");
  }

  let account
  try {
    account = await prisma.account.findUnique({
      "where": {
        username: payload.username
      },
      "include": {
        user: true
      }
    })
  } catch (error) {
    throw new Error("Failed to get account: " + error)
  }

  if (account) {
    return account
  } else {
    throw new Error("Account not found: " + payload.username);
  }
}

export { tokenToAccount };