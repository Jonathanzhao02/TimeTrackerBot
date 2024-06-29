#!/bin/bash
yarn install
yarn build
nohup yarn start > app.log 2> app.err < /dev/null &
echo $! > pid
