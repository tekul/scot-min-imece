#!/usr/bin/env bash

set -e

[ -z "$GITHUB_REPO" ] \
    && ( echo "GITHUB_REPO is not set!"; exit 1 )

[ -z "$GITHUB_TOKEN" ] \
    && ( echo "GITHUB_TOKEN is not set!"; exit 1 )

npm --prefix server run recreate-db:prod

repo=$GITHUB_REPO
token=$GITHUB_TOKEN

app=$HEROKU_APP_NAME
pr=$HEROKU_PR_NUMBER

post_data()
{
  cat <<EOF
{
  "event_type":"review-app-test",
  "client_payload":{
    "review_app_url": "https://${app}.herokuapp.com",
    "PR_NUM": "${pr}"
  }
}
EOF
}

curl -i \
-H "Accept: application/vnd.github.v3+json" \
-H "Authorization: Bearer $token" \
--data "$(post_data)" "https://api.github.com/repos/$repo/dispatches"

echo "Done."
