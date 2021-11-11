#!/bin/sh

yarn run compile

rm -rf ./dist/config
cp -r ./config ./dist/

yarn run link:modules &
chmod +x dist/lib/yardstick.js
wait
