import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { GitHubUser } from '../types/github-user'
import { RouteParams } from '../types/route-params'

function GithubUser() {
  const navigate = useNavigate()
  const params = useParams() as RouteParams
  const location = useLocation()

  const userInfo = useLoaderData() as GitHubUser

  const handleClickDetail = () => {
    if (!location.pathname.match(/\/details$/)) {
      navigate(`/user/${params.username}/details`)
    }
  }

  const handleClickRepos = () => {
    if (!location.pathname.match(/\/repos$/g)) {
      navigate(`/user/${params.username}/repos`)
    }
  }

  if (!userInfo) {
    return (
      <div>
        <div data-testid="github-user-not-found">Usuário inexistente</div>
      </div>
    )
  }

  return (
    <>
      <div className="row align-items-stretch" data-testid="github-user-test">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Nome</h5>
              <p className="card-text">{userInfo.name}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Repositório</h5>
              <p className="card-text">
                <a
                  href={userInfo.html_url}
                  className="btn btn-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userInfo.html_url}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 d-flex justify-content-between">
        <button
          className="btn btn-light"
          data-testid="github-user-details-test"
          onClick={handleClickDetail}
          type="button"
        >
          Ver os detalhes do usuário
        </button>
        <button
          className="btn btn-light"
          data-testid="github-user-repos-test"
          onClick={handleClickRepos}
          type="button"
        >
          Ver a listagem dos repositórios
        </button>
      </div>
      <div className="container py-5" data-testid="outlet-component">
        <Outlet />
      </div>
    </>
  )
}

export default GithubUser
