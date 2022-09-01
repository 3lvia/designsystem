#!/bin/bash
echo 'Tokens - Building elvis-colors and elvis-typography'
yarn build:tokens
# TODO: Build components only when changed
echo 'Components - Building components...'
yarn build:components
echo 'Web - Building web...'
yarn build:web
