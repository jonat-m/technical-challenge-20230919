import { describe, expect, it } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'

import GithubUserRepoDetail from './github-user-repo-detail'

describe('Checks if github-user-repo-detail route page are generated', async () => {
  it('if render minimum components', async () => {
    const VALID_ROUTE = `/user/valid-user/repos/valid-repository`
    const FAKE_LOAD_RETURN = {
      name: 'Valid Repository',
      description: 'Valid Repository detail',
      stargazers_count: 0,
      language: 'Repository language',
      html_url: 'https://api.github.com/repos/valid-user/valid-repository',
    }

    const routes = [
      {
        path: '/user/:username/repos/:repo',
        element: <GithubUserRepoDetail />,
        loader: () => FAKE_LOAD_RETURN,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', VALID_ROUTE],
      initialIndex: 1,
    })

    render(<RouterProvider router={router} />)
    await waitFor(() => screen.getByTestId('github-user-repo-detail-test'))

    expect(
      screen.getByTestId('github-user-repo-detail-link-test'),
    ).toBeInTheDocument()
  })
})
