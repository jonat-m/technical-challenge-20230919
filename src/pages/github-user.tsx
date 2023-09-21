import {
  Outlet,
  useParams,
  useNavigate,
  useLocation,
  useLoaderData
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
    return <div>Usuário inexistente</div>
  }

  return (
    <>
      <div className="row align-items-stretch ">
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
          type="button"
          className="btn btn-light"
          onClick={handleClickDetail}
        >
          Ver os detalhes do usuário
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={handleClickRepos}
        >
          Ver a listagem dos repositórios
        </button>
      </div>
      <div className="container py-5">
        <Outlet />
      </div>
    </>
  )
}

export default GithubUser
