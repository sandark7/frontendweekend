#!/usr/bin/env bash

SONAR_VERSION="sonar-scanner-cli-3.2.0.1227-linux"
SONAR_DIR="sonar-scanner-3.2.0.1227-linux"

wget -P "$HOME" -N "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/$SONAR_VERSION.zip"
unzip -d "$HOME" "$HOME/$SONAR_VERSION.zip"

echo "$CIRCLE_PULL_REQUEST"

PR_NUMBER=${CIRCLE_PULL_REQUEST##*/}

DEFAULT_SONAR_PARAMS="-Dsonar.login=$SONARQUBE_LOGIN \
                      -Dsonar.projectKey=nuxdie_frontendweekend \
                      -Dsonar.organization=nuxdie-github \
                      -Dsonar.sources=./src \
                      -Dsonar.host.url=https://sonarcloud.io"

if [[ -n $CIRCLE_PULL_REQUEST ]]; then
  echo "Preview analyzing ${CIRCLE_PULL_REQUEST} by SonarQube Github Plugin"
  # shellcheck disable=SC2086
  "$HOME/$SONAR_DIR"/bin/sonar-scanner $DEFAULT_SONAR_PARAMS \
    -Dsonar.pullrequest.base=master \
    -Dsonar.pullrequest.branch="$CIRCLE_BRANCH" \
    -Dsonar.pullrequest.key="$PR_NUMBER" \
    -Dsonar.pullrequest.provider=GitHub \
    -Dsonar.pullrequest.github.repository=nuxdie/frontendweekend;
fi

if [[ "$CIRCLE_BRANCH" == "master" ]]; then
    echo "Analyzing ${CIRCLE_BRANCH} branch to push issues to SonarQube server"
    # shellcheck disable=SC2086
    "$HOME/$SONAR_DIR"/bin/sonar-scanner $DEFAULT_SONAR_PARAMS;
fi
