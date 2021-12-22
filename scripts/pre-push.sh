#!/bin/bash
# TODO: Build components only when changed
cd packages/components
echo 'Components - Building components...'
yarn build
cd ../..
cd packages/web 
echo 'Web - Building web...'
yarn build