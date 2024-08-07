#!/bin/sh
set -e

if [ -f package.json ]; then
  bun install
fi

if ! bunx prisma migrate deploy; then
  echo "Prisma migration failed" >&2
  exit 1
fi

exec bun dev