# DemiCod - Step-by-Step Code Presenter

DemiCod lets you create and deliver step-by-step code presentations directly in VS Code. Select code snippets, build up steps, then walk through them incrementally - perfect for live coding demos, tutorials, and code reviews.

## Features

- **Add steps** - Select any code in the editor and add it as a presentation step
- **Start presentation** - Opens a temporary file and reveals code step by step, accumulating as you go
- **Navigate** - Move forward/backward through steps using keyboard shortcuts or status bar buttons
- **Per-file steps** - Steps are stored per-file in your workspace, so you can prepare multiple presentations

### Commands and Shortcuts

| Command | Shortcut | Description |
|---------|----------|-------------|
| `Demicod: Add Selection as Step` | `Ctrl+Shift+D` | Add selected code as a step |
| `Demicod: Start Presentation` | `Ctrl+Shift+Enter` | Start step-by-step presentation |
| `Demicod: Next Step` | `Ctrl+Shift+Right` | Go to next step |
| `Demicod: Previous Step` | `Ctrl+Shift+Left` | Go to previous step |
| `Demicod: End Presentation` | `Ctrl+Shift+Esc` | End presentation |
| `Demicod: Clear All Steps` | - | Clear all steps for current file |
| `Demicod: Remove Last Step` | - | Remove the last step for current file |
| `Demicod: Open Keyboard Shortcuts` | - | Open keyboard shortcuts filtered to DemiCod |

## How It Works

1. Open a file and select a code snippet
2. Press `Ctrl+Shift+D` to add the selection as a step (repeat for each logical step)
3. Press `Ctrl+Shift+Enter` to start the presentation - a temporary file opens
4. Navigate through steps - each step reveals accumulated code up to that point
5. Use the status bar buttons (`[Prev] [Next] [Stop]`) or keyboard shortcuts to control the flow

Steps are stored in `.demicod/presentation.json` in your workspace root.

## Requirements

VS Code 1.118.0 or later.

## Extension Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `demicod.stepSeparator` | `\n` | Separator inserted between accumulated steps during presentation |

## Known Issues

None yet.

## Release Notes

### 0.0.1

Initial release.
