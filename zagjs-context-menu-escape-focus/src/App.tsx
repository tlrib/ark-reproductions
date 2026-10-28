import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { useEffect, useState } from 'react'

export default function App() {
  const [focus, setFocus] = useState('Page body (no control focused)')
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      if (!document.hasFocus()) return setFocus('Outside this preview')
      const element = document.activeElement
      if (!element || element === document.body) return setFocus('Page body (no control focused)')
      if (element.getAttribute('role') === 'menu') return setFocus('Menu')
      setFocus(element.getAttribute('aria-label') || element.textContent?.trim() || element.tagName.toLowerCase())
    }
    const deferUpdate = () => { clearTimeout(timer); timer = setTimeout(update, 0) }
    document.addEventListener('focusin', update)
    document.addEventListener('focusout', deferUpdate)
    window.addEventListener('focus', update)
    window.addEventListener('blur', deferUpdate)
    update()
    return () => {
      clearTimeout(timer)
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', deferUpdate)
      window.removeEventListener('focus', update)
      window.removeEventListener('blur', deferUpdate)
    }
  }, [])
  return <main>
    <h1>Context menu focus return</h1>
    <p><strong>Try:</strong> Focus Open context menu, press Shift+F10, wait for the menu, then press Escape.</p>
    <p><strong>Expected:</strong> Escape closes the menu and returns focus to Open context menu.</p>
    <p><strong>Actual:</strong> The menu closes, but focus falls to the page body.</p>
    <Menu.Root lazyMount unmountOnExit>
      <Menu.ContextTrigger>Open context menu</Menu.ContextTrigger>
      <Portal><Menu.Positioner><Menu.Content>
        <Menu.Item value="rename">Rename</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
      </Menu.Content></Menu.Positioner></Portal>
    </Menu.Root>
    <button>After</button>
    <p>Current focus: <strong id="result">{focus}</strong></p>
  </main>
}
