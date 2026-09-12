import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { routes } from './routes.jsx'
import './index.css'

const container = document.getElementById('root')
const router = createBrowserRouter(routes)

const app = (
  <StrictMode>
    <App router={router} />
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
