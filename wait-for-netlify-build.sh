#!/usr/bin/env bash

if [[ "$CIRCLE_BRANCH" == "master" ]]; then
    SITE_URL = "https://frontendweekend.ml"
else
    PR_NUMBER=`echo ${CIRCLE_PULL_REQUEST##*/}`
    SITE_URL = "https://deploy-preview-${PR_NUMBER}--frontendweekend.netlify.com"
fi

echo "Waiting for ${SITE_URL} to come alive"
until $(curl --output /dev/null --silent --head --fail ); do
    printf '.'
    sleep 5
done

