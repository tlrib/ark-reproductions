import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'

createRoot(document.getElementById('root')!).render(<App />)

const updatePosition = () => {
  const output = document.getElementById('scroll-position')
  if (output) output.textContent = `window.scrollY: ${window.scrollY}`
}
window.addEventListener('scroll', updatePosition, { passive: true })
requestAnimationFrame(updatePosition)
