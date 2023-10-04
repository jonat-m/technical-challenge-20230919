import { useCallback, useState } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'

import { GitHubRepo } from '../types/github-user-repo'

function UserRepoListRender({ repoList }: { repoList: GitHubRepo[] }) {
  if (!repoList.length) {
    return (
      <tr key={0}>
        <td>Não há Repositório públicos</td>
        <td>-</td>
      </tr>
    )
  }

  return (
    <>
      {repoList.map(repo => (
        <tr key={repo.id}>
          <td>
            <NavLink
              data-testid="github-user-repos-list-item-test"
              end
              to={repo.name}
            >
              {repo.name}
            </NavLink>
          </td>
          <td>{repo.stargazers_count}</td>
        </tr>
      ))}
    </>
  )
}

function GithubUserRepos() {
  const userReposList = useLoaderData() as GitHubRepo[]

  const [repoList, setRepoList] = useState(userReposList)

  const handleClick = useCallback(() => {
    const reverso = [...repoList.reverse()]
    setRepoList(reverso)
  }, [])

  return (
    <>
      <div className="container" data-testid="github-user-repos-list-test">
        <h2 className="mt-5">Lista de Repositórios do GitHub</h2>
        <div className="table-responsive mt-4">
          <table
            className="table table-striped"
            data-testid="github-user-repos-list-table-test"
          >
            <thead>
              <tr>
                <th>Nome do Repositório</th>
                <th>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleClick}
                  >
                    Estrelas
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <UserRepoListRender repoList={repoList} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default GithubUserRepos
