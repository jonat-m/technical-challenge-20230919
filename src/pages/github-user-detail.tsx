import { useLoaderData } from 'react-router-dom'

import { GitHubUser } from '../types/github-user'

function GithubUserDetail() {
  const userInfos = useLoaderData() as GitHubUser

  return (
    <div className="card" data-testid="github-user-detail-test">
      {userInfos.avatar_url && (
        <img
          alt={`${userInfos.login}'s avatar`}
          className="rounded mx-auto d-block"
          src={userInfos.avatar_url}
          style={{ maxWidth: '250px' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{userInfos.name}</h5>
        <p className="card-text">Seguidores: {userInfos.followers}</p>
        <p className="card-text">Seguindo: {userInfos.following}</p>
        <p className="card-text">E-mail: {userInfos.email}</p>
        <p className="card-text">Bio: {userInfos.bio}</p>
      </div>
    </div>
  )
}

export default GithubUserDetail
