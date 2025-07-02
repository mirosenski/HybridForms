#!/bin/bash

GREENBOLD="\033[1;32m"
COLBOLD_END='\033[39m\033[0m'

pwd=$(pwd)
cd ../../../

echo -e "\n\n${GREENBOLD}****** EXPORTING FORM Demo_Field_Service ******${COLBOLD_END}\n"
npm run export -- --formDefPath=formdefinitions/area.ExampleForms/Demo_Field_Service --outputPath=formdefinitions/area.ExampleForms/Exported

cd $pwd
exit 0

