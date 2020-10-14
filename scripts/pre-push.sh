#!/bin/bash
echo 'Elvis - Building project before pushing...'
cd packages/web 
node --max_old_space_size=4096 ./packages/web/node_modules/@angular/cli/bin/ng build --source-map=false --progress=false
cd ../..