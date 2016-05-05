#!/bin/bash
cat \
    ./js/util.js \
    ./js/receive.js \
    ./js/join.js \
    ./js/connection.js \
    ./js/send.js \
    ./js/init.js \
    > ./index.js

uglifyjs -cmo index.min.js -- index.js
