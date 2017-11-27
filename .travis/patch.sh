#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    setup_git() {
        git config --global user.email "Raymond.Benefield@gmail.com"
        git config --global user.name "Raymond Benefield"
    }

    commit_website_files() {
        git remote add origin-deploy https://${GH_TOKEN}@github.com/RayBenefield/transmutation.git > /dev/null 2>&1
        git fetch origin-deploy master
        git branch --track master origin-deploy/master
        git reset --hard origin-deploy/master
        npm version patch --no-git-tag-version
    }

    upload_files() {
        git push origin-deploy HEAD:master --tags
    }

    setup_git
    commit_website_files
    upload_files
else
    echo "Not creating a patch since this is not master."
fi
