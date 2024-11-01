import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/features/routes'
import { ReduxToolkitProvider } from '@/shared/plugins/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxToolkitProvider>
      <RouterProvider router={router} />
    </ReduxToolkitProvider>
  </StrictMode>,
)
