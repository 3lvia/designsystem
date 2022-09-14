#!/bin/bash
# TODO: Build components only when changed
echo 'Elvis - Building package before commiting...'
yarn build:elvis
files=$(git ls-files -m | grep "packages/elvis" | wc -l | tr -d ' ')
if [[ $files != "0" ]]; then
    echo 
    echo 'Elvis - [Error] Uncommited changes to Elvis'
    echo 'Elvis - [Error] Fix before comitting or bypass with "git commit -n" or "git commit --no-verify"'
    git ls-files -m | grep "packages/elvis"
    exit 1
fi
echo 'Tokens - Building colors, typography and icons...'
yarn build:tokens
echo 'Components - Building components...'
yarn build:components
echo 'Web - Building web...'
yarn build:web
