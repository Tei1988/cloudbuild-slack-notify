/** @jsx JSXSlack.h */
import JSXSlack, { Block, Section, Divider, Field } from '@speee/jsx-slack';
import { CloudBuildMessage } from './Interfaces';

function message(status: string): string {
  switch(status) {
      case 'SUCCESS':
          return 'CIいけたで:exclamation:グッジョブや:+1:'
      case 'FAILURE':
      case 'INTERNAL_ERROR':
      case 'TIMEOUT':
          return 'CIいけへんかったで:exclamation:はよ直したって:expressionless:'
      default:
          return 'なんかよーわからんで';
  }
}

function emoji(status: string): string {
  switch(status) {
      case 'SUCCESS':
          return ':ok_woman:'
      case 'FAILURE':
      case 'INTERNAL_ERROR':
      case 'TIMEOUT':
          return ':akan:'
      default:
          return ':eset:';
  }
}

export function notificationBlock(build: CloudBuildMessage) {
  return JSXSlack(
    <Block>
      <Section>
        <b>{ message(build.status) }</b>
      </Section>
      <Section>
        <a href={'https://console.cloud.google.com/cloud-build/builds/' + build.id}>ビルドログ</a>
      </Section>
      <Section>
        <Field><b>リポジトリ</b></Field>
        <Field>{ build.source.repoSource.projectId }/{ build.source.repoSource.repoName }</Field>
      </Section>
      <Section>
        <Field><b>ブランチ</b></Field>
        <Field>{ build.source.repoSource.branchName }</Field>
      </Section>
      <Divider />
      <Section>
        <Field><b>各ステップ</b></Field>
      </Section>
      {build.steps.map((step) => {
        return (<Section>
          <Field><b>{ step.id || step.name }</b></Field>
          <Field>{ emoji(step.status) }</Field>
        </Section>)})}
    </Block>
  )
}
