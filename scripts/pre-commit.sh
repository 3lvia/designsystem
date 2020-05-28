#!/bin/bash
echo 
echo 'Elvis - Building package before commiting...'
cd style/elvis
npm run build
cd ../..
files=$(git ls-files -m | grep "style/elvis" | wc -l | tr -d ' ')
if [[ $files != "0" ]]; then
    echo 
    echo 'Elvis - [Error] Uncommited changes to Elvis'
    echo 'Elvis - [Error] Fix before comitting or bypass with "git commit -n" or "git commit --no-verify"'
    git ls-files -m | grep "style/elvis"
    exit 1
fi