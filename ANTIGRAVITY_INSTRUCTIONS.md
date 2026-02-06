# Antigravity Agent Instructions

This file contains critical development guidelines and "gotchas" for working on the Dashy project. Please read this before making any changes.

## Critical: `app.json` Generation

> [!WARNING]
> **DO NOT EDIT `app.json` DIRECTLY.**

`app.json` is a generated file built from the `.homeycompose` directory and individual widget configuration files. Any manual changes made to `app.json` will be **overwritten and lost** the next time the app is built or run.

### How to Modify App Configuration:

1.  **General App Settings**: Edit files in the `.homeycompose/` directory (e.g., `.homeycompose/app.json` for base config, though in this project structure, widget configs seem to drive the build).
2.  **Widget Settings**: Edit the `widget.compose.json` file located in each widget's directory:
    - Path: `widgets/<widget-name>/widget.compose.json`
    - Example: To add a setting to the Analog Clock, edit `widgets/analog-clock/widget.compose.json`.

### Build Process:

When you run `homey app build` or `homey app run`, the Homey CLI aggregates all `widget.compose.json` files and the `.homeycompose` configuration to generate the final `app.json`.

**ALWAYS** check for the existence of `widget.compose.json` files before attempting to modify widget settings in `app.json`.

## Widget Standards & Patterns

To ensure consistency across widgets, adhere to the following standards.

### 1. Naming Conventions

*   **Vertical Spacing**: Use `verticalSpacing` for outer spacing options.
    *   Values: `none` (0px), `minimal` (4px), `standard` (8px), `big` (16px), `extrabig` (32px), `massive` (48px).
*   **Show In Card**: Use `showInCard` (boolean) to toggle the card appearance.
    *   **True (Default)**: Renders the widget inside a standard Homey card with background, shadow, and padding.
    *   **False**: Renders the widget transparently with **0px padding** and no shadow/background. Ideal for "floating" look.

### 2. Settings Order

> [!IMPORTANT]
> **Settings must always be ordered alphabetically (A-Z) by their `id`** in `widget.compose.json` files. This ensures consistent UX across all widgets.

### 3. DOM Structure

Structure widgets to separate the "spacing" container from the "card" content. This prevents background colors from extending into the spacing area.

```html
<body>
    <!-- Outer wrapper handles vertical spacing -->
    <div id="app-container" class="widget-spacing-wrapper">
        <!-- Inner card handles background, border-radius, shadow -->
        <div id="widget-card" class="widget-card">
            <!-- Widget Content -->
        </div>
    </div>
</body>
```

### 4. Sizing & Height

*   **Dynamic Height**: Avoid fixed heights in code where possible. Use `document.body.scrollHeight` to report height to Homey.
*   **Aspect Ratios**: If a widget requires a specific shape (e.g., analog clock), use CSS `aspect-ratio` or calculate height based on width, but always ensure the reported height encompasses the full container including the spacing wrapper.

### 5. Standard Size Settings

Widgets that do not follow a fixed aspect ratio should use the standardized size setting:

| ID | Label (EN) | Label (NL) |
|----|------------|------------|
| `xsmall` | Extra Small | Extra Klein |
| `small` | Small | Klein |
| `medium` | Medium (default) | Gemiddeld |
| `large` | Large | Groot |
| `xlarge` | Extra Large | Extra Groot |

**Widgets using this standard**:
- Analog Clock
- Digital Clock
- Flip Clock
- Binary Clock

**CSS Implementation**: Each widget implements size classes like `.size-xsmall`, `.size-small`, `.size-medium`, `.size-large`, `.size-xlarge` that control the element scale via `font-size` (em-based), direct pixel dimensions, or other appropriate methods.

> [!NOTE]
> Widgets that use fixed aspect ratios (like map or video embeds) may not need a size setting as they scale to fill available width.

## Useful Documentation

*   [Homey Widgets Overview](https://apps.developer.homey.app/the-basics/widgets)
*   [Widget Settings](https://apps.developer.homey.app/the-basics/widgets/settings)
*   [Widget Styling](https://apps.developer.homey.app/the-basics/widgets/styling)
*   [Widget Debugging](https://apps.developer.homey.app/the-basics/widgets/debugging)
*   [App Store Guidelines](https://apps.developer.homey.app/app-store/guidelines)
*   [Publishing Apps](https://apps.developer.homey.app/app-store/publishing)
*   [App Updates](https://apps.developer.homey.app/app-store/updates)
