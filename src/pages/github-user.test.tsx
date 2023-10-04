import { describe, expect, it } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'

import GithubUser from './github-user'

describe('Checks if github-user route page are generated', async () => {
  describe('Render in their minimum components', async () => {
    it('with invalid user', async () => {
      const INVALID_ROUTE = `/user/invalid-user`

      const FAKE_LOAD_RETURN = null
      const routes = [
        {
          path: '/user/:username',
          element: <GithubUser />,
          loader: () => FAKE_LOAD_RETURN,
        },
      ]

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', INVALID_ROUTE],
        initialIndex: 1,
      })

      render(<RouterProvider router={router} />)
      const githubUserNotFound = await waitFor(() =>
        screen.getByTestId('github-user-not-found'),
      )
      expect(githubUserNotFound).toBeInTheDocument()
    })

    it('with valid user', async () => {
      const VALID_ROUTE = `/user/valid-user`

      const FAKE_LOAD_RETURN = {
        login: 'valid-user',
        html_url: 'https://github.com/valid-user',
        name: 'valid-user',
      }

      const routes = [
        {
          path: '/user/:username',
          element: <GithubUser />,
          loader: () => FAKE_LOAD_RETURN,
        },
      ]

      const router = createMemoryRouter(routes, {
        initialEntries: ['/', VALID_ROUTE],
        initialIndex: 1,
      })

      render(<RouterProvider router={router} />)
      await waitFor(() => screen.getByTestId('github-user-test'))

      expect(screen.getByTestId('github-user-details-test')).toBeInTheDocument()
      expect(screen.getByTestId('github-user-repos-test')).toBeInTheDocument()
      expect(screen.getByTestId('outlet-component')).toBeInTheDocument()
    })
  })
})
