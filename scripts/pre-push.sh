#!/bin/bash
# TODO: Build components only when changed
echo 'Tokens - Building colors, typography and icons...'
yarn build:tokens
echo 'Components - Building components...'
yarn build:components
echo 'Web - Building web...'
yarn build:web
