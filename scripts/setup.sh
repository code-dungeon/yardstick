#!/bin/sh

yarn install
yarn compile
yarn run clean:link
yarn run link:modules

chmod +x dist/lib/yardstick.js

if [[ ! -L "./tslint.json" ]] ; then
  ln -s ./node_modules/@code-dungeon/typescript-lint/tslint.json .
fi
