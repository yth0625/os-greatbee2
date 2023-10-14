#!/usr/bin/env bash

cp /home/greatbee/deploy/gb-front/gb-front.zip .
unzip gb-front.zip
rm -rf assets/ images/ index.html
mv dist/* .
rm gb-front.zip
