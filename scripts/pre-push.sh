#!/bin/bash
echo 'Building elvis-colors...'
yarn build:colors
echo 'Building elvis-typography...'
yarn build:typography
# TODO: Build components only when changed
cd packages/components
echo 'Components - Building components...'
yarn build
cd ../..
cd packages/web 
echo 'Web - Building web...'
yarn build
