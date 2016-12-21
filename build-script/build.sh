#!/bin/bash
#####################
#   PROJECT BUILD   #
#####################

currentDir=`pwd`
if [ "$1" == "-h" ] || [[ "$currentDir" != *ims-project ]]; then
    printf "Usage: run the script in the root directory of the project!\n\n"
    printf "Options:\n"
    printf "\t-s\tSkip tests\n"
    printf "\t-mongo\tBuild mongodb image\n"
    exit 0
fi

for arg in "$@"
do
    if [ "$arg" == "-s" ]; then
        skipTests="-DskipTests"
    fi

    if [ "$arg" == "-mongo" ]; then
        docker build -t mongo-service:latest mongodb
    fi
done

mvn clean install -Pdocker $skipTests