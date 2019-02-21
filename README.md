# CloudBuild Slack Notify

## Installation

1. Install gcloud command
1. Prepare to use Cloud Build, PubSub and Cloud Functions
1. Get Slack Webhook URL from Slack
1. Rename config.yaml.sample to config.yaml
1. Set above url to SLACK_WEBHOOK_URL in config.yaml
1. `git submodule update -i`
1. `cd jsx-slack && npm install && cd -`
1. `npm install`
1. `npm run-script build`
1. `npm run-script deploy`
