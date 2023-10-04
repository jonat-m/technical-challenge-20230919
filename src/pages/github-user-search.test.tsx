import { describe, expect, test } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import { render, screen } from '@testing-library/react'

import GithubUserSearch from './github-user-search'

// verifica cada pagina se tem os componentes mínimos
describe('Checks if GithubUserSearch route pages', async () => {
  test('are generated in their minimum components', () => {
    render(<GithubUserSearch />, { wrapper: BrowserRouter })

    // it must have an search input field
    expect(screen.getByTestId('github-user-search-field')).toBeInTheDocument()

    // it must have an submit input field
    expect(screen.getByTestId('github-user-search-submit')).toBeInTheDocument()
  })
})
