#!/bin/bash
# TODO: Build components only when changed
echo 'Components - Building components...'
yarn build:components
echo 'Web - Building web...'
yarn build:web
