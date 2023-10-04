import { describe, expect, it } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'

import GithubUserRepos from './github-user-repos'

describe('Checks if github-user-repos route page are generated', async () => {
  it('Render in their minimum components with valid user and two repos', async () => {
    const VALID_ROUTE = `/user/valid-user/repos`
    const FAKE_LOAD_RETURN = [
      {
        id: 1,
        name: 'Repositorio 1',
        stargazers_count: 1,
      },
      {
        id: 2,
        name: 'Repositorio 2',
        stargazers_count: 2,
      },
    ]

    const routes = [
      {
        path: '/user/:username/repos',
        element: <GithubUserRepos />,
        loader: () => FAKE_LOAD_RETURN,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', VALID_ROUTE],
      initialIndex: 1,
    })

    render(<RouterProvider router={router} />)
    await waitFor(() => screen.getByTestId('github-user-repos-list-test'))

    expect(
      screen.getByTestId('github-user-repos-list-table-test'),
    ).toBeInTheDocument()
    expect(
      screen.getAllByTestId('github-user-repos-list-item-test').length,
    ).toBeGreaterThan(0)
  })
})
