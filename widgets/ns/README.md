# NS Train Departures Widget

**Directory**: `widgets/ns`

Real-time train departure board for Dutch Railways (NS).

## Features
*   **Live Data**: Connects to the NS API to fetch real-time departure info.
*   **Details**: Shows departure time, destination, platform, and delay information.
*   **Configurable**: Limit the number of departures shown.

## Settings (`widget.compose.json`)

| ID | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `station` | Text | `Amsterdam CS` | The station name/code to fetch departures for. |
| `apiKey` | Text | - | **Required**. The NS API Primary Key. |
| `maxDepartures` | Number | `5` | Number of trains to list (1-10). |
| `showPlatform` | Checkbox | `true` | Show platform numbers. |
| `showDelay` | Checkbox | `true` | Show delay information (e.g., +5 min). |
| `refreshInterval` | Number | `60` | Refresh rate in seconds (30-300). |

## Development Notes
*   **API Usage**: Requires a valid NS API key. Errors (invalid key, network issues) should be handled gracefully with user feedback.
*   **Scrolling**: If the list of departures exceeds the widget height, it should optionally scroll or be truncated.
