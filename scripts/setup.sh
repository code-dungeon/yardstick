#!/bin/sh

yarn install
yarn compile
yarn run clean:link
yarn run link:modules

chmod +x dist/lib/yardstick.js
