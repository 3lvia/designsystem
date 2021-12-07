#!/bin/bash
cd packages/components
echo 'Components - Building components...'
yarn build
cd ../..
cd packages/web 
echo 'Web - Building web...'
yarn build