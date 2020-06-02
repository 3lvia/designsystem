#!/bin/bash
if [ "$(uname)" == "Darwin" ]; then
    npm run commitizen-unix    
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    npm run commitizen-unix
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    npm run commitizen-windows
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    npm run commitizen-windows
fi