import { Collapsible } from '@ark-ui/react/collapsible'

export default function App() {
  return <main>
    <h1>Disabled collapsible</h1>
    <p>Tab from Before. Details still receives focus. Press Alt+A to inspect the trigger.</p>
    <button>Before</button>
    <Collapsible.Root disabled>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Content>Hidden content</Collapsible.Content>
    </Collapsible.Root>
    <button>After</button>
    <pre id="result" aria-live="polite">Press Alt+A to inspect.</pre>
  </main>
}
