#!/bin/bash
echo 'Tokens - Building elvis-colors...'
yarn build:colors
echo 'Tokens - Building elvis-typography...'
yarn build:typography
# TODO: Build components only when changed
echo 'Components - Building components...'
yarn build:components:affected
echo 'Web - Building web...'
yarn build:web
