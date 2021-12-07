#!/bin/bash
cd packages/components
echo 'Components - Building components...'
yarn build
cd ../..
cd packages/web 
echo 'Components - Building web...'
yarn build