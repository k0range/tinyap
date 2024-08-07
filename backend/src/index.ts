import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { swagger } from '@elysiajs/swagger'
import { PrismaClient } from '@prisma/client'

import fs from 'fs';
import path from 'path';

import eventEmitter from './eventEmitter';

import AccountService from "./core/AccountService";
import TimelineService from "./core/TimelineService";
import UserService from "./core/UserService";

console.log("TinyAP\n")

const prisma = new PrismaClient()

const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET_KEY || '',
      exp: "1h"
    })
  )

  .use(AccountService)
  .use(TimelineService)
  .use(UserService)

  // ここにないrouteはすべてフロントエンドにproxy
  .get("*", async ({ request }: any) => {
    const url = new URL(request.url)

    const headers = {
      ...request.headers,
      'Origin': 'http://frontend:5173'
    }
    headers['accept-encoding'] = undefined;

    const response = await fetch(`http://frontend:5173${url.pathname}${url.search}`, {
      method: request.method,
      headers: headers,
      body: request.body
    })

    const responseHeaders = new Headers(response.headers)
    responseHeaders.delete('content-encoding')

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders
    });
  })

console.log(
  `🔄 Loading Modules...`
);

// Load Modules
const modulesDir = path.join(__dirname, '../modules');
const moduleDirs = fs.readdirSync(modulesDir);

for (const dir of moduleDirs) {
  const pluginPath = path.join(modulesDir, dir, 'index.ts');
  let plugin;
  try {
    const { default: plugin } = await import(pluginPath);
    plugin(app);
    console.log(`🧩 Module Loaded: ${dir}`)
  } catch (error) {
    console.error(`Failed to load module: ${dir}`, error);
    continue;
  }
}

app.use(swagger())

app.listen(3000);

console.log(
  `🟢 TinyAP is running at ${app.server?.hostname}:${app.server?.port}`
);
