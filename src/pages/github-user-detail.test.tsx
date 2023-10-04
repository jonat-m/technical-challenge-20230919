import { describe, expect, it } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'

import GithubUserDetail from './github-user-detail'

describe('Checks if github-user-detail route page are generated', async () => {
  it('if render minimum components', async () => {
    const VALID_ROUTE = '/user/:username/details'
    const FAKE_LOAD_RETURN = {
      avatar_url: 'https://avatars.githubusercontent.com/u/valid-user?v=4',
      bio: 'bio info',
      email: 'user email',
      followers: 1,
      following: 1,
      login: 'valid user login',
      name: 'valid user name',
    }

    const routes = [
      {
        path: '/user/:username/details',
        element: <GithubUserDetail />,
        loader: () => FAKE_LOAD_RETURN,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', VALID_ROUTE],
      initialIndex: 1,
    })

    render(<RouterProvider router={router} />)

    const githubUserDetailTest = await waitFor(() =>
      screen.getByTestId('github-user-detail-test'),
    )
    expect(githubUserDetailTest).toBeInTheDocument()
  })
})
