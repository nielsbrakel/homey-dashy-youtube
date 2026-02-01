# Dashy Widgets Standards

This directory contains the widgets for the Dashy dashboard. This document outlines the **shared standards and development guidelines** that must be followed to ensure consistency across all widgets. All AI agents and developers should refer to this guide when creating or modifying widgets.

## 🎨 General Consistency

To maintain a cohesive look and feel, all widgets must adhere to the following principles:

*   **Homey Styling**: Always use Homey's native CSS variables.
    *   Background: `var(--homey-background-color)`
    *   Text: `var(--homey-text-color)`, `var(--homey-text-color-secondary)`
    *   Borders: `var(--homey-line-light)` or `var(--homey-line-dark)`
    *   Accents: `var(--homey-color-blue-500)`, `var(--homey-color-red-500)`, etc.
*   **Typography**: Use standard Homey font sizes and weights.
*   **Transparency**: Widgets should generally support a transparency toggle or handle transparent backgrounds gracefully.

## 📏 Sizing & Aspect Ratios

Visual widgets (charts, maps, videos, etc.) must implement standardized aspect ratios to ensure they fit predictable grid slots.

### Implementation
*   **Settings ID**: `aspectRatio`
*   **Logic**: Use `Homey.ready({ height: ... })` to set the height relative to the width based on the selected ratio.

### Standard Ratios
| Ratio | Use Case |
| :--- | :--- |
| **1:1** | Square widgets, small indicators. |
| **4:3** | Legacy video, tall charts. |
| **16:9** | **Default** for most media and charts. |
| **21:9** | Ultrawide, panoramic views. |

## 🔘 Button Placement

Interactive controls that float over the widget content (e.g., Close, Refresh, Settings) must follow a strict positioning grid.

*   **Position**: Absolute, Top-Right relative to the widget container.
*   **Coordinates**: `top: 4px`, `right: 4px`.
*   **Styling**:
    *   **Dimensions**: ~24px x 24px.
    *   **Shape**: Circular (`border-radius: 50%`).
    *   **Background**: `var(--homey-color-mono-100)` (Default), `var(--homey-color-mono-200)` (Hover).
    *   **Icon**: Centered SVG or character.
*   **Stacking**: If multiple buttons are needed, stack them horizontally or vertically depending on the specific widget layout, but the primary action should map to the standard corner position.

## 🔄 Refresh Intervals

Widgets that fetch external data must offer configurable refresh intervals.

*   **Standard Options**:
    *   Manual Only (0)
    *   Short (e.g., 5 minutes for weather)
    *   Medium (e.g., 15-30 minutes)
    *   Long (e.g., 1 hour)
*   **Implementation**: Use `setInterval` in the widget logic, ensuring it clears and restarts when settings change.

---

## 📂 Widget Structure

Each widget is located in its own subdirectory and must contain:
1.  **`README.md`**: Specific documentation for that widget (Usage, options, etc.).
2.  **`widget.compose.json`**: The Homey widget definition.
3.  **`public/`**: The web assets (HTML, CSS, JS).

Refer to the specific `README.md` in each widget's folder for detailed implementation notes.
