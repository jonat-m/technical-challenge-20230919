import React from 'react'
import ReactDOM from 'react-dom/client'

import Routes from './routes/routes'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
)
