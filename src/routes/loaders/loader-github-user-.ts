import { LoaderFunctionArgs } from 'react-router-dom'

import fetchApi from '../../api'
import { RouteParams } from '../../types/route-params'

async function loaderGithubUser({ params }: LoaderFunctionArgs<RouteParams>) {
  const userInfos = await fetchApi(`users/${params.username}`)
  return userInfos
}

export default loaderGithubUser
