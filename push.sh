#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# npm run build

cd ./
git status
git add -A
git commit -m 'update'

git push

cd -