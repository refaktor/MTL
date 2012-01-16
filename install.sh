#!/bin/bash

CURRDIR=`pwd`

# commdands.txt to have empty lines
echo "HI, THIS IS TOTAL WORK IN PROGRESS VERSION!"

for cmd in `cat commands.txt | cut -f 1 | grep -v "^#"`
do
    echo "installing $cmd"
    ln -s ${CURRDIR}/j4m-${cmd} /usr/bin/j4m-${cmd}
done
ln -s ${CURRDIR}/j4m /usr/bin/j4m




