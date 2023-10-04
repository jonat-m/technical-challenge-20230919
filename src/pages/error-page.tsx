import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  let errorMsg = 'Unknown error message'

  if (isRouteErrorResponse(error)) {
    errorMsg = error.statusText
  } else if (error instanceof Error) {
    errorMsg = error.message
  }

  return (
    <div className="container" data-testid="error-page-test">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h1 className="display-4">Oops!</h1>
          <p className="lead">Sorry, an unexpected error has occurred.</p>
          <p className="mb-4">
            <i>{errorMsg}</i>
          </p>
        </div>
      </div>
    </div>
  )
}
