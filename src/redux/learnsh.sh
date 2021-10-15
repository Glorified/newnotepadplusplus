#!/bin/zsh

abc="def"
echo $abc

if [ $abc = "deff" ];
then
    echo "equal"
else
    echo "unequal"
fi

function foo() {
    echo $1
}

foo "aakash"


