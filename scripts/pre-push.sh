#!/bin/bash
cd packages/components 
echo SUCCESS
echo 'Elvis - Building project before pushing...'
cd ../..
cd packages/web 
node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --source-map=false --progress=false
cd ../..