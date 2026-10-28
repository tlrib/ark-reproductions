import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { useEffect, useRef, useState } from 'react'
import axe from 'axe-core'

export default function App() {
  const [value, setValue] = useState<string | null>(null)
  const [result, setResult] = useState('Open Item One to check its invisible focus helper.')
  const audit = useRef(Promise.resolve())
  useEffect(() => {
    if (!value) {
      setResult('Open Item One to check its invisible focus helper.')
      return
    }
    let cancelled = false
    setResult('Checking the invisible focus helper…')
    audit.current = audit.current.then(async () => {
      await new Promise(requestAnimationFrame)
      if (cancelled) return
      const proxy = document.querySelector('[data-trigger-proxy]')
      if (!proxy) { setResult('No focus helper found.'); return }
      const attributes = `aria-hidden="${proxy.getAttribute('aria-hidden')}" · tabindex="${proxy.getAttribute('tabindex')}"`
      const { violations } = await axe.run(document, { runOnly: { type: 'rule', values: ['aria-hidden-focus'] } })
      if (!cancelled) setResult(`${attributes}\nAccessibility check: ${violations.length ? 'FAIL — aria-hidden-focus' : 'PASS'}`)
    }).catch(error => {
      if (!cancelled) setResult(`Accessibility check could not run: ${error.message}`)
    })
    return () => { cancelled = true }
  }, [value])
  return <main>
    <h1>Navigation menu: hidden keyboard target</h1>
    <p><strong>Try:</strong> Click Item One. Opening it creates an invisible helper for moving keyboard focus.</p>
    <p><strong>Expected:</strong> An element hidden from screen readers must not be a keyboard focus target.</p>
    <p><strong>Actual:</strong> The helper is hidden from screen readers but stays in the Tab order. The check below runs automatically.</p>
    <NavigationMenu.Root onValueChange={({ value }) => setValue(value)}>
      <NavigationMenu.List>
        <NavigationMenu.Item value="one">
          <NavigationMenu.Trigger>Item One</NavigationMenu.Trigger>
          <NavigationMenu.Content value="one">
            <NavigationMenu.Link href="#destination" value="one">Destination</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.ViewportPositioner><NavigationMenu.Viewport /></NavigationMenu.ViewportPositioner>
    </NavigationMenu.Root>
    <pre id="result" aria-live="polite">{result}</pre>
  </main>
}
