#!/bin/sh

printf "Cleaning yardstick in node_modules\n"
rm -rf ./node_modules/.bin/yardstick
rm -rf ./node_modules/yardstick
rm -rf dist/config