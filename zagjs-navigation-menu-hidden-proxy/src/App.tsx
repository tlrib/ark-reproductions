import { NavigationMenu } from '@ark-ui/react/navigation-menu'

export default function App() {
  return <main>
    <h1>Navigation menu proxy</h1>
    <p>Click Item One, then press Alt+A to inspect the proxy and run axe without moving focus.</p>
    <NavigationMenu.Root>
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
    <pre id="result" aria-live="polite">Press Alt+A to inspect.</pre>
  </main>
}
