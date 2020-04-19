#!/bin/sh

if [ -d dist_cbon ]; then
	echo "removing old dist_cbon"
	rm -r dist_cbon
fi

cp -r dist/ dist_cbon
cd dist_cbon || exit 1

sed -i -e 's/href=\//href=\/delivery\//g' index.html
sed -i -e 's/src=\//src=\/delivery\//g' index.html

scp -r -P 8022 ./* root@81.94.19.25:/www/coffeebon/delivery

cd ..

if [ -d dist_cbon ]; then
	echo "removing old dist_cbon"
	rm -r dist_cbon
fi


