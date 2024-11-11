import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactRouterProvider, ReduxToolkitProvider } from './shared'
import { Toaster } from './shared/components/ui'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxToolkitProvider>
      <ReactRouterProvider />
      <Toaster />
    </ReduxToolkitProvider>
  </StrictMode>,
)
