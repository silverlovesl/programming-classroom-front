#! /bin/bash

IS_STAGING=0

while getopts s OPT; do
case "$OPT" in
	h)
		echo -e ""
		echo -e "Usage: ./start.sh"
		echo -e ""
		echo -e " -h                                   Help document"
		echo -e " -s                                   Is staging"
		echo -e ""
		exit 1
		;;
	s)
		IS_STAGING=1
		;;
	-*)
		echo "$PROGNAME: illegal option -- '$(echo $1 | sed 's/^-*//')'" 1>&2
		exit 1
		;;
	*)
		echo "Invalid option"
		exit 1
		;;
	esac
done

if [ $IS_STAGING -eq 1 ]; then
  echo "Build for staging"
  export STAGING=1 && quasar build
  rm -rf /usr/share/nginx/html/programming-classroom-staging/*
  mv -v ./dist/spa-mat/* /usr/share/nginx/html/programming-classroom-staging/
else
  echo "Build for prodcution !!"
  export STAGING=0 && quasar build
  rm -rf /usr/share/nginx/html/programming-classroom/*
  mv -v ./dist/spa-mat/* /usr/share/nginx/html/programming-classroom-staging/
fi

