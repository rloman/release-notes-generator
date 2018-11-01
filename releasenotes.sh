#! /bin/bash
git shortlog --format="%cI %s" --no-merges --reverse master..HEAD | node ./releasenotes.js $1
