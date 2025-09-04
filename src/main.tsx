import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import DebugGrid from './DebugGrid'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <DebugGrid /> */}
  </StrictMode>,
)
