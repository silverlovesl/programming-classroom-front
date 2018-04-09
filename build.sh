#! /bin/bash

dev=0 && quasar build
rm -rf /usr/share/nginx/html/programming-classroom/*
mv -v ./dist/spa-mat/* /usr/share/nginx/html/programming-classroom/