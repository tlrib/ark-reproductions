# Ark UI / Zag.js reproductions

Standalone React projects using Ark UI primitives directly. Each folder reproduces one behavior without application wrappers.

| Reproduction | Source | Run in browser |
| --- | --- | --- |
| Disabled Collapsible trigger lacks disabled semantics | [Source](zagjs-collapsible-disabled/) | [StackBlitz](https://stackblitz.com/github/tlrib/ark-reproductions/tree/main/zagjs-collapsible-disabled) |
| Keyboard-opened Context Menu loses focus after Escape | [Source](zagjs-context-menu-escape-focus/) | [StackBlitz](https://stackblitz.com/github/tlrib/ark-reproductions/tree/main/zagjs-context-menu-escape-focus) |
| Navigation Menu proxy fails axe `aria-hidden-focus` | [Source](zagjs-navigation-menu-hidden-proxy/) | [StackBlitz](https://stackblitz.com/github/tlrib/ark-reproductions/tree/main/zagjs-navigation-menu-hidden-proxy) |
| Initially highlighted Combobox item scrolls the document | [Source](zagjs-combobox-document-scroll/) | [StackBlitz](https://stackblitz.com/github/tlrib/ark-reproductions/tree/main/zagjs-combobox-document-scroll) |

## Run locally

Install [Bun](https://bun.sh), then run from the repository root:

```sh
bun install --cwd zagjs-collapsible-disabled --frozen-lockfile
bun run --cwd zagjs-collapsible-disabled dev
```

Substitute any other folder name to run that reproduction. StackBlitz installs dependencies and starts Vite automatically.

## Reproduction steps

### Disabled Collapsible

1. Click **Before**, then press Tab.
2. **Details** receives focus despite the root being disabled.
3. Press **Alt+A** to inspect the trigger markup without changing focus.

Expected: the trigger exposes disabled semantics. Actual: it has `data-disabled` but neither `disabled` nor `aria-disabled`, and remains tabbable.

### Context Menu focus return

1. Press Tab to focus **Open context menu**.
2. Press **Shift+F10** and wait for focus to enter the menu.
3. Press **Escape**, then **Alt+A** to inspect focus.

Expected: focus returns to the context trigger. Actual: the menu closes and focus ends on the document body.

### Navigation Menu proxy

1. Click **Item One**.
2. Press **Alt+A** to inspect the trigger proxy and run the axe `aria-hidden-focus` rule.

Expected: no `aria-hidden-focus` violation. Actual: the proxy combines `aria-hidden="true"` with `tabindex="0"` and fails the rule.

### Combobox document scroll

1. Open the preview in a fresh tab, ideally at 1280 x 720.
2. Do not click, type, or scroll.
3. Observe the fixed `window.scrollY` readout. Reload to repeat.

Expected: the document stays at scroll position 0. Actual: it scrolls toward the highlighted item below the viewport even though the item is visible within its own list. The exact offset depends on the viewport.

## Versions

Projects pin Ark UI React 5.39.3 and React 19.3.1. Each overrides its affected Zag machine and the Zag React adapter to 1.47.0. Other Ark machine dependencies retain their original versions. The Navigation Menu reproduction uses axe-core 4.14.0.

Vite 7.3.7 avoids the Vite 8 native Rolldown binding used by newer versions, which did not run in the WebContainer used to prepare these examples. Each project includes its own Bun lockfile; no local path dependencies are required.

These examples document observed behavior; they do not imply that an upstream issue has been filed or accepted.
