#! /bin/bash
git shortlog --format="%cI %s" --reverse master..HEAD | node ./releasenotes.js $1
