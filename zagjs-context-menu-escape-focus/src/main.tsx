import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'

createRoot(document.getElementById('root')!).render(<App />)

document.addEventListener('keydown', async (event) => {
  if (!event.altKey || event.key.toLowerCase() !== 'a') return
  event.preventDefault()
  const target = document.querySelector("[data-scope=\"menu\"][data-part=\"context-trigger\"]")
  const result = {
    activeElement: document.activeElement?.outerHTML,
    target: target?.outerHTML ?? 'not mounted',
  }
  document.getElementById('result')!.textContent = JSON.stringify(result, null, 2)
})
