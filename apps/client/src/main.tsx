import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactRouterProvider, ReduxToolkitProvider } from './shared'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxToolkitProvider>
      <ReactRouterProvider />
    </ReduxToolkitProvider>
  </StrictMode>,
)
