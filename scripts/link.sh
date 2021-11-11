#!/bin/sh

printf "Cleaning yardstick in node_modules...\n"
rm -rf ./node_modules/.bin/yardstick
rm -rf ./node_modules/@code-dungeon/yardstick


printf "Linking yardstick in node_modules...\n"
mkdir -p ./node_modules/@code-dungeon/yardstick
cd node_modules/@code-dungeon/yardstick

if [[ ! -L "./package.json" ]] ; then
  ln -s ../../../package.json package.json
fi

if [[ ! -L "./dist" ]] ; then
  ln -s ../../../dist .
fi

# if [[ ! -f "./dist/config" ]] ; then
#   ln -s ../config ./dist/config
# fi

cd -

printf "Linking yardstick bin command...\n"
mkdir -p ./node_modules/.bin
cd node_modules/.bin

if [[ ! -L "./yardstick" ]] ; then
  ln -s ../@code-dungeon/yardstick/dist/lib/yardstick.js yardstick
  chmod +x ../@code-dungeon/yardstick/dist/lib/yardstick.js
fi

cd -
