import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'
import axe from 'axe-core'

createRoot(document.getElementById('root')!).render(<App />)

document.addEventListener('keydown', async (event) => {
  if (!event.altKey || event.key.toLowerCase() !== 'a') return
  event.preventDefault()
  const target = document.querySelector("[data-trigger-proxy]")
  const result = {
    activeElement: document.activeElement?.outerHTML,
    target: target?.outerHTML ?? 'not mounted',
    violations: (await axe.run(document, { runOnly: { type: 'rule', values: ["aria-hidden-focus"] } })).violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) })),
  }
  document.getElementById('result')!.textContent = JSON.stringify(result, null, 2)
})
