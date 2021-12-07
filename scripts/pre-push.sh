#!/bin/bash
cd packages/components 
echo SUCCESS
echo 'Components - Building components project'
yarn run build
cd ../..
cd packages/web 
echo SUCCESS
echo 'Web - Building web prosject'
node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --source-map=false --progress=false
cd ../..