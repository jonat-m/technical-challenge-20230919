import { useLoaderData, useNavigate } from 'react-router-dom'

import { GitHubRepoDetail } from '../types/github-user-repo-detail'

function GithubUserRepoDetail() {
  const userRepoDetail = useLoaderData() as GitHubRepoDetail
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <div className="card" data-testid="github-user-repo-detail-test">
      <div className="card-body">
        <h5 className="card-title">{userRepoDetail.name}</h5>
        <p className="card-text">{userRepoDetail.description}</p>
        <p className="card-text">Estrelas: {userRepoDetail.stargazers_count}</p>
        <p className="card-text">Linguagem: {userRepoDetail.language}</p>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClick}
          >
            Retornar
          </button>
          <a
            data-testid="github-user-repo-detail-link-test"
            href={userRepoDetail.html_url}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default GithubUserRepoDetail
