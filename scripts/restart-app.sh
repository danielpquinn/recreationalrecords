#!/bin/bash
cd /var/www/recreationalrecords
npm install
forever stopall
forever start ./node_modules/.bin/ts-node app.ts
forever start ./node_modules/.bin/keystone start
