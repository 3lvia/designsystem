#!/bin/bash
cd packages/elvis-colors
echo 'Building elvis-colors...'
yarn build
cd ../..
# TODO: Build components only when changed
cd packages/components
echo 'Components - Building components...'
yarn build
cd ../..
cd packages/web 
echo 'Web - Building web...'
yarn build