#!/usr/bin/env bash

SONAR_VERSION="sonar-scanner-cli-3.2.0.1227-linux"
SONAR_DIR="sonar-scanner-3.2.0.1227-linux"

wget -P $HOME -N "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/${SONAR_VERSION}.zip"
unzip -d $HOME $HOME/$SONAR_VERSION.zip

PR_NUMBER=`echo "${CI_PULL_REQUEST}" | sed -e 's/.*\///g'`

DEFAULT_SONAR_PARAMS="-Dsonar.login=$SONARQUBE_LOGIN \
                      -Dsonar.projectName=$CIRCLE_PROJECT_REPONAME \
                      -Dsonar.projectVersion=$CIRCLE_BUILD_NUM \
                      -Dsonar.projectKey=nuxdie_frontendweekend \
                      -Dsonar.organization=nuxdie-github \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=https://sonarcloud.io"

if [ -n "$CI_PULL_REQUEST" ]; then
  SONAR_PROJECT_KEY=$CIRCLE_PROJECT_USERNAME:$CIRCLE_PROJECT_REPONAME

  echo "Preview analyzing ${CI_PULL_REQUEST} by SonarQube Github Plugin"
  $HOME/$SONAR_DIR/bin/sonar-scanner $DEFAULT_SONAR_PARAMS \
    -Dsonar.github.repository=$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME \
    -Dsonar.github.pullRequest="${PR_NUMBER}" \
    -Dsonar.github.oauth="${GITHUB_OAUTH}" \
    -Dsonar.analysis.mode=preview;
fi

if [ "$CIRCLE_BRANCH" == "master" ]; then
    echo "Analyzing ${CIRCLE_BRANCH} branch to push issues to SonarQube server"
    $HOME/$SONAR_DIR/bin/sonar-scanner $DEFAULT_SONAR_PARAMS;
fi