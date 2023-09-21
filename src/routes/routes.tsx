import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from '../pages/error-page'
import GithubUser from '../pages/github-user'
import GithubUserDetail from '../pages/user-detail'
import GithubUserRepos from '../pages/github-user-repos'
import GithubUserSearch from '../pages/github-user-search'
import loaderGithubUser from './loaders/loader-github-user-'
import loaderGithubUserDetail from './loaders/loader-github-user-detail'
import loaderGithubUserRepos from './loaders/loader-github-user-repos'
import loaderUserRepoDetail from './loaders/loader-github-user-repo-detail'
import UserRepoDetail from '../pages/user-repo-detail'

const router = createBrowserRouter([
  {
    element: <GithubUserSearch />,
    errorElement: <ErrorPage />,
    path: '/',
    children: [
      {
        element: <GithubUser />,
        loader: loaderGithubUser,
        path: '/user/:username',
        children: [
          {
            element: <GithubUserDetail />,
            loader: loaderGithubUserDetail,
            path: '/user/:username/details'
          },
          {
            element: <GithubUserRepos />,
            loader: loaderGithubUserRepos,
            path: '/user/:username/repos'
          },
          {
            element: <UserRepoDetail />,
            loader: loaderUserRepoDetail,
            path: '/user/:username/repos/:repo'
          }
        ]
      }
    ]
  }
])

export default function Routes() {
  return <RouterProvider router={router} />
}
