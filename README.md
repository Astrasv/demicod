<div align="center">

# DemiCod - (De)liberate (Mi)cro-dosing For (Co)de (D)emos

![DemiCod Logo](asset/demicod%20light%20logo.png#gh-light-mode-only)
![DemiCod Logo](asset/demicod%20dark%20logo.png#gh-dark-mode-only)

**Step-by-Step Code Presenter for VS Code**

[![VS Code](https://img.shields.io/badge/VS_Code-^1.118.0-007ACC?style=flat&logo=visual-studio-code)](https://code.visualstudio.com)
[![Version](https://img.shields.io/badge/version-0.0.1-blue)](https://github.com/Astrasv/demicod)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/Astrasv/demicod/pulls)
[![Made with](https://img.shields.io/badge/made_with-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org)

---

> **DemiCod** lets you create and deliver step-by-step code presentations directly in VS Code.
> Select snippets, build up steps, then walk through them incrementally.
> Perfect for live coding, tutorials, code reviews, and looking like you actually prepared.

---

</div>

## Table of Contents

- [Features](#features)
- [Commands & Shortcuts](#commands--shortcuts)
- [Configuration](#configuration)
- [Release Notes](#release-notes)

---

## Features

> [!TIP]
> These features work best when you have code selected in an open editor.
> No editor open? No steps for you.

| Feature | Description |
|---------|-------------|
| Add Steps | Select code and save it as a presentation step |
| Start Presentation | Opens a temp file and reveals code step-by-step |
| Navigate | Move forward/backward through accumulated steps |
| Per-file Storage | Steps are stored per-file -- prepare multiple demos |

<details>
<summary><b>How it works (click to expand)</b></summary>

<br>

1. Open a file and select a code snippet
2. Press `Ctrl+Shift+D` to add it as a step
3. Repeat for each logical step in your presentation
4. Press `Ctrl+Shift+Enter` to start the presentation
5. Navigate with keyboard shortcuts or status bar buttons

> [!NOTE]
> Steps are stored in `.demicod/presentation.json` in your workspace root.
> No servers, no databases, no subscription fees.
> You can share you presentation with anyone. Just a simple JSON

</details>

---

## Commands & Shortcuts

> [!NOTE]
> Shortcuts are customizable. You can change to your favorites

| Command | Shortcut | Description |
|---------|----------|-------------|
| `Demicod: Add Selection as Step` | `Ctrl+Shift+D` / `Cmd+Shift+D` | Add selected code as a step |
| `Demicod: Start Presentation` | `Ctrl+Shift+Enter` / `Cmd+Shift+Enter` | Begin step-by-step presentation |
| `Demicod: Next Step` | `Ctrl+Shift+Right` / `Cmd+Shift+Right` | Advance to next step |
| `Demicod: Previous Step` | `Ctrl+Shift+Left` / `Cmd+Shift+Left` | Go back one step |
| `Demicod: End Presentation` | `Ctrl+Shift+Esc` / `Cmd+Shift+Esc` | End the current presentation |
| `Demicod: Clear All Steps` | - | Remove all steps for current file |
| `Demicod: Remove Last Step` | - | Undo your last step addition |
| `Demicod: Open Keyboard Shortcuts` | - | Opens shortcut settings filtered to DemiCod |

> [!WARNING]
> Clearing steps is permanent. There is no undo for undo.

### Context Menu

Right-click any selection in the editor and choose **Demicod: Add Selection as Step** from the context menu.

---

## Configuration

This extension contributes the following settings:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `demicod.stepSeparator` | `string` | `"\n"` | Separator between accumulated steps during presentation |

You can configure this in your `settings.json`:

```jsonc
{
  // Add breathing room between steps
  "demicod.stepSeparator": "\n\n"
}
```

---


## Built With

<div align="center">

| Technology | Purpose |
|------------|---------|
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [VS Code API](https://code.visualstudio.com/api) | Extension framework |
| [esbuild](https://esbuild.github.io/) | Bundler |
| [ESLint](https://eslint.org/) | Linting |
| [Mocha](https://mochajs.org/) | Testing |

</div>

---


## Release Notes

### 0.0.1 (2026-05-10)

- Initial release
- Core features: add steps, start presentation, navigate, clear
- Keyboard shortcuts and status bar controls
- Per-file step management
- Configurable step separator

---

<div align="center">

**Made by [Sudharsan Vanamali](https://github.com/Astrasv)**

If you find this useful, star the repo. It makes us feel warm inside.

[Report Bug](https://github.com/Astrasv/demicod/issues) | [Request Feature](https://github.com/Astrasv/demicod/issues) | [Star on GitHub](https://github.com/Astrasv/demicod)

</div>
