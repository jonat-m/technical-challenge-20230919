const baseUrl = 'https://api.github.com'

async function fetchApi(url: string) {
  if (!url) {
    return
  }

  return await fetch(`${baseUrl}/${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação HTTP: ' + response.status)
      }
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(() => {
      return null
    })
}

export default fetchApi
