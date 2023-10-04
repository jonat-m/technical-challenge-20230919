import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ErrorPage from '../pages/error-page'
import GithubUser from '../pages/github-user'
import GithubUserDetail from '../pages/github-user-detail'
import GithubUserRepoDetail from '../pages/github-user-repo-detail'
import GithubUserRepos from '../pages/github-user-repos'
import GithubUserSearch from '../pages/github-user-search'

// verifica cada pagina se tem os componentes mínimos
describe('check navigation in a standard user', async () => {
  const FAKE_LOADER_GITHUB_USER = {
    login: 'valid-user',
    html_url: 'https://github.com/valid-user',
    name: 'valid-user',
  }
  const FAKE_LOADER_GITHUB_USER_DETAIL = {
    avatar_url: 'https://avatars.githubusercontent.com/u/valid-user?v=4',
    bio: 'bio info',
    email: 'user email',
    followers: 1,
    following: 1,
    login: 'valid user login',
    name: 'valid user name',
  }
  const FAKE_LOADER_GITHUB_USER_REPOS = [
    {
      id: 1,
      name: 'Repositorio 1',
      stargazers_count: 1,
    },
  ]
  const FAKE_LOADER_GITHUB_USER_REPO_DETAIL = {
    name: 'Valid Repository',
    description: 'Valid Repository detail',
    stargazers_count: 0,
    language: 'Repository language',
    html_url: 'https://api.github.com/repos/valid-user/valid-repository',
  }

  const routes: RouteObject[] = [
    {
      element: <GithubUserSearch />,
      errorElement: <ErrorPage />,
      path: '/',
      children: [
        {
          element: <GithubUser />,
          loader: () => FAKE_LOADER_GITHUB_USER,
          path: '/user/:username',
          children: [
            {
              element: <GithubUserDetail />,
              loader: () => FAKE_LOADER_GITHUB_USER_DETAIL,
              path: '/user/:username/details',
            },
            {
              element: <GithubUserRepos />,
              loader: () => FAKE_LOADER_GITHUB_USER_REPOS,
              path: '/user/:username/repos',
            },
            {
              element: <GithubUserRepoDetail />,
              loader: () => FAKE_LOADER_GITHUB_USER_REPO_DETAIL,
              path: '/user/:username/repos/:repo',
            },
          ],
        },
      ],
    },
  ]

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 1,
  })

  render(<RouterProvider router={router} />)

  const user = userEvent.setup()

  it('simple path journey', async () => {
    // path: '/',

    const userClicks = vi.spyOn(user, 'click')

    const githubUserSearchField = await waitFor(() =>
      screen.getByTestId('github-user-search-field'),
    )
    const githubUserSearchSubmit = screen.getByTestId(
      'github-user-search-submit',
    )

    await user.click(githubUserSearchField)
    await user.type(githubUserSearchField, 'valid-user')
    await user.click(githubUserSearchSubmit)

    // path: '/user/:username',

    expect(userClicks).toHaveBeenCalledTimes(2)

    const githubUserDetail = await waitFor(() =>
      screen.getByTestId('github-user-test'),
    )

    expect(githubUserDetail).toBeInTheDocument()

    await user.click(screen.getByTestId('github-user-details-test'))

    // path: '/user/:username/details',

    const githubUserDetailTest = await waitFor(() =>
      screen.getByTestId('github-user-detail-test'),
    )

    expect(githubUserDetailTest).toBeInTheDocument()

    await user.click(screen.getByTestId('github-user-repos-test'))

    // path: '/user/:username/repos',
    await waitFor(() => screen.getByTestId('github-user-repos-list-test'))

    const githubUserReposListItemTest = screen.getByTestId(
      'github-user-repos-list-item-test',
    )

    await user.click(githubUserReposListItemTest)

    // path: '/user/:username/repos/:repo',
    const githubUserRepoDetailTest = await waitFor(() =>
      screen.getByTestId('github-user-repo-detail-test'),
    )

    expect(githubUserRepoDetailTest).toBeInTheDocument()
  })
})
