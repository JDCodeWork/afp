import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ReactRouterProvider, ReduxToolkitProvider } from './shared'
import { Toaster } from './shared/components/ui'

import './index.css'
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxToolkitProvider>
      <ReactRouterProvider />
      <Toaster />
    </ReduxToolkitProvider>
  </StrictMode>,
)
