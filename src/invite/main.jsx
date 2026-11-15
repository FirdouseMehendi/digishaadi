import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './invite.css'
import Invite from './Invite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Invite />
  </StrictMode>,
)
