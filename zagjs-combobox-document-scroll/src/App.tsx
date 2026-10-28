import { Combobox, createListCollection } from '@ark-ui/react/combobox'

const collection = createListCollection({ items: ['Alpha', 'Beta', 'Gamma'] })

export default function App() {
  return <main>
    <h1>Combobox scrolls the document on mount</h1>
    <p>Open in a fresh tab. Do not click or press a key. Expected: window.scrollY stays at 0.</p>
    <output id="scroll-position" aria-label="Document scroll position" />
    <div style={{ height: 1600 }} aria-hidden="true" />
    <Combobox.Root collection={collection} open disableLayer closeOnSelect={false} defaultHighlightedValue="Alpha">
      <Combobox.Label>Choose an item</Combobox.Label>
      <Combobox.Control><Combobox.Input /></Combobox.Control>
      <Combobox.Content style={{ maxHeight: 80, overflowY: 'auto' }}>
        {collection.items.map((item) => <Combobox.Item key={item} item={item} style={{ height: 40 }}>
          <Combobox.ItemText>{item}</Combobox.ItemText>
        </Combobox.Item>)}
      </Combobox.Content>
    </Combobox.Root>
    <div style={{ height: 800 }} aria-hidden="true" />
  </main>
}
