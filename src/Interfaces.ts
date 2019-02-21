export interface PubsubMessage {
  "@type": string
  attributes: {}
  data: string
}

export interface CloudBuildRepoSource {
  projectId: string
  repoName: string
  branchName: string
}

export interface CloudBuildSource {
  repoSource: CloudBuildRepoSource
}

export interface CloudBuildStep {
  id?: string
  name: string
  status: string
}

export interface CloudBuildMessage {
  id: string
  status: string
  projectId: string
  source: CloudBuildSource
  steps: Array<CloudBuildStep>
}
