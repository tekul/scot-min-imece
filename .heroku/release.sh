#!/usr/bin/env bash

set -e

echo "******* Running release script *******"

npm --prefix server run recreate-db:prod

[ -z "$GITHUB_REPO" ] \
    && ( echo "GITHUB_REPO is not set!"; exit 1 )

[ -z "$GITHUB_TOKEN" ] \
    && ( echo "GITHUB_TOKEN is not set!"; exit 1 )

repo=$GITHUB_REPO
token=$GITHUB_TOKEN

app=$HEROKU_APP_NAME
pr=$HEROKU_PR_NUMBER

curl -X POST \

     -H "Accept: application/vnd.github.v3+json" \
     -H "Authorization: Bearer $token" \

     https://api.github.com/repos/$repo/dispatches \

     -d '{"event_type":"review-app-test",
       "client_payload":{
        "review_app_url": "https://$app.herokuapp.com",
        "PR_NUM": "$pr"
       }
      }'

echo "Done."
