#!/bin/sh

if [ -d dist_cbon ]; then
	echo "removing old dist_cbon"
	rm -r dist_cbon
fi

cp -r dist/ dist_cbon
cd dist_cbon

sed -i -e 's/href=\//href=\/delivery\//g' index.html
sed -i -e 's/src=\//src=\/delivery\//g' index.html

scp -r * root@192.168.25.9:/www/coffeebon/delivery/

cd ..

if [ -d dist_cbon ]; then
	echo "removing old dist_cbon"
	rm -r dist_cbon
fi


