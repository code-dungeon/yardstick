#!/bin/sh

yarn run compile
yarn run link:modules &
chmod +x dist/lib/yardstick.js
wait