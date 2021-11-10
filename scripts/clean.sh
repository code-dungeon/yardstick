#!/bin/sh

yarn run clean:dependencies &
yarn run clean:dist &
yarn run clean:link &

wait