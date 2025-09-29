#!/usr/bin/env bash
set -euo pipefail
echo '>> Instalando dependências...'
if command -v pnpm >/dev/null 2>&1; then
  pnpm install
elif command -v yarn >/dev/null 2>&1; then
  yarn install
else
  npm i --legacy-peer-deps
fi
echo '>> OK'