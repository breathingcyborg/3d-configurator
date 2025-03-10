import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'

async function enableMocking() {
  if (import.meta.env.VITE_MOCK_API !== 'true') {
    return
  }
  
  // mocking handler to avoid paying for hosting backend
  const { worker } = await import('./mocks/browser')
 
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

