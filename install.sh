#!/bin/bash

CURRDIR=`pwd`

# commdands.txt to have empty lines
echo "HI, THIS IS TOTAL WORK IN PROGRESS VERSION!"

for cmd in `cat mtl-commands.txt | cut -f 1 | grep -v "^#"`
do
    echo "installing $cmd"
    ln -s ${CURRDIR}/mtl-${cmd} /usr/bin/mtl-${cmd}
done
ln -s ${CURRDIR}/mtl /usr/bin/mtl




