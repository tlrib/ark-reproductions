import { Collapsible } from '@ark-ui/react/collapsible'
import { useEffect, useState } from 'react'

export default function App() {
  const [attributes, setAttributes] = useState('Checking disabled attributes…')
  useEffect(() => {
    const trigger = document.querySelector<HTMLButtonElement>('[data-scope="collapsible"][data-part="trigger"]')!
    setAttributes(`disabled: ${trigger.hasAttribute('disabled') ? 'present' : 'missing'} · aria-disabled: ${trigger.getAttribute('aria-disabled') ?? 'missing'}`)
  }, [])
  return <main>
    <h1>Disabled collapsible</h1>
    <p><strong>Try:</strong> Details is configured as disabled. Click Before, then press Tab.</p>
    <p><strong>Expected:</strong> Tab skips Details and moves to After. Details is announced as disabled.</p>
    <p><strong>Actual:</strong> Tab focuses Details. It has no disabled attribute for browsers or screen readers.</p>
    <button>Before</button>
    <Collapsible.Root disabled>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Content>Hidden content</Collapsible.Content>
    </Collapsible.Root>
    <button>After</button>
    <p id="result">{attributes}</p>
  </main>
}
