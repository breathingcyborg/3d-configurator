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

  const vitePrefix = (import.meta.env.VITE_PREFIX || '') + '/';
  
  return worker.start({
    serviceWorker: {
      url: `${vitePrefix}/mockServiceWorker.js`
    }
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

