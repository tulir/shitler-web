#!/bin/bash
cat \
    ./css/util.css \
    ./css/text.css \
    ./css/join.css \
    > ./index.css

yui-compressor ./index.css -o ./index.min.css
