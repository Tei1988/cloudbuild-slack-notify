import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/client';

import { PubsubMessage, CloudBuildMessage } from './Interfaces';
import { notificationBlock } from './notificationBlock';

declare var process : {
  env: {
    SLACK_WEBHOOK_URL: string
  }
}
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

function cloudBuildNotifier(event: PubsubMessage) {
    const build = eventToBuild(event.data);
    switch(build.status) {
        case 'SUCCESS':
            webhook.send(createSlackMessage(build, '#3eb370'));
            break;
        case 'FAILURE':
        case 'INTERNAL_ERROR':
        case 'TIMEOUT':
            webhook.send(createSlackMessage(build, '#eb6101'));
            break;
        default:
            return;
    }
}

function createSlackMessage(build: CloudBuildMessage, color: string): IncomingWebhookSendArguments {
  return {
    username: 'CloudBuildおじさん',
    icon_emoji: ':jenkins:',
    attachments: [{
      color: color,
      blocks: notificationBlock(build)
    }]
  };
}

function eventToBuild(data: string): CloudBuildMessage {
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

export { cloudBuildNotifier }
