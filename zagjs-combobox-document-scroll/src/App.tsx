import { Combobox, createListCollection } from '@ark-ui/react/combobox'

const collection = createListCollection({ items: ['Alpha', 'Beta', 'Gamma'] })

export default function App() {
  return <main>
    <h1>Combobox scrolls the document on mount</h1>
    <p><strong>Try:</strong> Open the preview in a fresh tab. Do not click, type, or scroll.</p>
    <p><strong>Expected:</strong> The page stays at the top (scroll position 0).</p>
    <p><strong>Actual:</strong> The page jumps down to the highlighted item, although it is already visible inside its list.</p>
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
