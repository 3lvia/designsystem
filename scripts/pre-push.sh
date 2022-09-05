#!/bin/bash
# TODO: Build components only when changed
echo 'Tokens - Building colors, typography and icons...'
yarn build:tokens
echo 'Components - Building components...'
yarn build:components
echo 'Components - Running components tests...'
yarn test
echo 'Web - Building web...'
yarn build:web
