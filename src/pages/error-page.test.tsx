import { describe, expect, it } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { render, screen, waitFor } from '@testing-library/react'

import ErrorPage from './error-page'
import GithubUserSearch from './github-user-search'

describe('Checks if error route has rendered', async () => {
  it('with invalid user', async () => {
    const INVALID_ROUTE = `/invalid-route`

    const routes = [
      {
        path: '/',
        element: <GithubUserSearch />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', INVALID_ROUTE],
      initialIndex: 1,
    })

    render(<RouterProvider router={router} />)

    const errorPage = await waitFor(() => screen.getByTestId('error-page-test'))
    expect(errorPage).toBeInTheDocument()
  })
})
