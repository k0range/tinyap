#!/bin/sh
set -e

if [ -f package.json ]; then
  bun install
fi

bunx prisma migrate deploy

exec bun dev