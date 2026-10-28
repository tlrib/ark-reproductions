import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'

export default function App() {
  return <main>
    <h1>Context menu focus return</h1>
    <p>Tab to Open context menu, press Shift+F10, then Escape. Press Alt+A to inspect focus without moving it.</p>
    <Menu.Root lazyMount unmountOnExit>
      <Menu.ContextTrigger>Open context menu</Menu.ContextTrigger>
      <Portal><Menu.Positioner><Menu.Content>
        <Menu.Item value="rename">Rename</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
      </Menu.Content></Menu.Positioner></Portal>
    </Menu.Root>
    <button>After</button>
    <pre id="result" aria-live="polite">Press Alt+A to inspect.</pre>
  </main>
}
