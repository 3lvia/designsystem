#!/bin/bash
if [ "$(uname)" == "Darwin" ]; then
    yarn run commitizen-unix    
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    yarn run commitizen-unix
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    yarn run commitizen-windows
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    yarn run commitizen-windows
fi