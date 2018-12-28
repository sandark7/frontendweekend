#!/usr/bin/env bash

cd ..
git config credential.helper 'cache --timeout=120'
git config user.email "sc-import-bot@frontendweekend.ml"
git config user.name "SC Import Bot"
git add .
git commit -am "new episodes commit"
git push -q https://${SC_IMPORT_GITHUB_TOKEN}@github.com/nuxdie/frontendweekend.git master
