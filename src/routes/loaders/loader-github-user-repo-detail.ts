import { LoaderFunctionArgs } from 'react-router-dom'

import fetchApi from '../../api'
import { GitHubRepoDetail } from '../../types/github-user-repo-detail'
import { RouteParams } from '../../types/route-params'

async function loaderGithubUserRepoDetail({
  params
}: LoaderFunctionArgs<RouteParams>) {
  const { username, repo } = params
  const repoDetail = (await fetchApi(
    `repos/${username}/${repo}`
  )) as GitHubRepoDetail[]
  return repoDetail
}

export default loaderGithubUserRepoDetail
