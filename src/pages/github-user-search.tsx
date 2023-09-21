import { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { RouteParams } from '../types/route-params'

function GithubUserSearch() {
  const navigate = useNavigate()

  const params = useParams() as RouteParams
  const [searchTerm, setSearchTerm] = useState(params.username || '')
  const [emptyFieldError, setEmptyFieldError] = useState(false)

  const handleClick = () => {
    const githubUser = searchTerm.trim()
    if (searchTerm.trim()) {
      setEmptyFieldError(false)
      navigate(`/user/${githubUser}`)
    } else {
      setEmptyFieldError(true)
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className="container container-lg">
      <h1>
        Desafio Técnico 21/09/2023
        {params.username && (
          <button
            className="btn btn-link"
            onClick={() => {
              navigate('/')
            }}
            type="button"
          >
            inicio
          </button>
        )}
      </h1>
      <div className="input-group">
        <input
          className={`form-control ${emptyFieldError ? 'is-invalid' : ''}`}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Pesquisa usuário do Github"
          required
          type="text"
          value={searchTerm}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleClick}
          >
            Buscar
          </button>
        </div>
        {emptyFieldError && (
          <>
            <br />
            <div className="invalid-feedback">
              O campo de pesquisa não pode estar vazio.
            </div>
          </>
        )}
      </div>
      <div className="container py-5">
        <Outlet />
      </div>
    </div>
  )
}

export default GithubUserSearch
