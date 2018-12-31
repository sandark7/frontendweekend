#!/usr/bin/env bash

git config credential.helper 'cache --timeout=120'
git config user.email "sc-import-bot@frontendweekend.ml"
git config user.name "SC Import Bot"
git add .
git commit -am "new episodes & comments commit"
git push -q https://${SC_IMPORT_GITHUB_TOKEN}@github.com/nuxdie/frontendweekend.git master
