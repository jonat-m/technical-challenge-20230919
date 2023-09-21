import { LoaderFunctionArgs } from 'react-router-dom'

import fetchApi from '../../api'
import { GitHubRepo } from '../../types/github-user-repo'
import { RouteParams } from '../../types/route-params'

async function loaderGithubUserRepos({
  params
}: LoaderFunctionArgs<RouteParams>) {
  const repos = (await fetchApi(
    `users/${params.username}/repos`
  )) as GitHubRepo[]
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export default loaderGithubUserRepos
