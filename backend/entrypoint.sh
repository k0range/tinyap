#!/bin/sh
set -e
set -x

if [ -f package.json ]; then
  bun install
fi

if ! bunx prisma migrate deploy; then
  echo "Prisma migration failed" >&2
  exit 1
fi

if ! bunx prisma generate; then
  echo "Prisma generate failed" >&2
  exit 1
fi
exec bun dev