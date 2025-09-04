import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DebugGrid from './DebugGrid.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <DebugGrid /> */}
  </StrictMode>,
)
