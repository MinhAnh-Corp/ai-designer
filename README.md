# AI Designer MCP

Design beautiful UIs with **React + Tailwind CSS + Ant Design** using Qwen Code or Gemini CLI.

> **⚠️ Hooks format (array required) — read before editing `settings.json` / `settings.claude.json`**
>
> Claude Code validates hooks strictly. The inner `hooks` field **must be an array** of `{type, command}` objects. Putting `command` directly under the matcher causes a validation error like *"only accept array"* and the settings file fails to load on a fresh machine.
>
> **✅ Correct:**
> ```json
> {
>   "hooks": {
>     "SessionStart": [
>       {
>         "matcher": "",
>         "hooks": [
>           { "type": "command", "command": "echo hi" }
>         ]
>       }
>     ]
>   }
> }
> ```
>
> **❌ Wrong (breaks on clone):** `{ "matcher": "", "command": "echo hi" }` — missing the nested `hooks: [...]` array.

> **⚠️ Registering this MCP on a new machine**
>
> Claude Code on Windows stores MCP registrations in `~/.claude.json` (not `settings.json`). After `npm install`:
>
> ```bash
> claude mcp add --scope user ai-designer node "<PROJECT_ROOT>/ai-agents/ai-designer/server.js"
> claude mcp list   # should show ✓ Connected
> ```
>
> Qwen shares the same server by adding the identical `mcpServers` entry in `~/.qwen/settings.json` (Qwen does read `mcpServers` from its settings file — Claude does not).


## Features

- 🎨 **Design Discovery** - Ask requirements before designing
- 🖼️ **Component Generation** - Production-ready React components
- 📦 **Sandbox Preview** - Preview designs in browser before applying
- 🔄 **Multiple Variants** - Generate 2-3 styles to compare
- 📸 **Screenshot to Code** - Convert design references to code
- ✅ **Design Review** - Audit and improve existing designs
- 🚀 **Apply to Project** - Integrate designs into your codebase

## Quick Start

### 1. Install

```bash
cd <PROJECT_ROOT>/ai-agents/ai-designer
bash setup.sh
```

### 2. Restart Qwen Code

The MCP server will load automatically.

### 3. Start Designing

```
Design a dashboard header component for my admin panel
```

## Tools

| Tool | Description |
|------|-------------|
| `design_discovery` | Ask discovery questions before designing |
| `design_generate` | Generate React + Tailwind + Ant Design component |
| `design_variants` | Generate 2-3 design variants to compare |
| `design_apply` | Apply generated design to existing project |
| `screenshot_to_code` | Convert screenshot/design reference to code |
| `design_review` | Review and suggest improvements |

## Workflow

```
1. design_discovery
   ↓ (answers questions)
2. design_generate (sandbox mode)
   ↓ (preview in browser)
3. Iterate: "make it more minimal", "add animations"
   ↓ (satisfied)
4. design_apply (copy to project)
```

## Design Styles

| Style | Description |
|-------|-------------|
| `modern_minimal` | Clean, Apple-style, generous whitespace |
| `glassmorphism` | Glass effects, gradients, blur backgrounds |
| `dark_neon` | Dark mode, vibrant accents, bold |
| `adaptive` | AI chooses best style (recommended) |

## Integration with ai-agent-auto

This MCP integrates with your existing `ai-agent-auto` setup:

- **parallel-orchestrator**: For complex design tasks
- **Skills**: /audit, /review, /debug for design quality
- **Memory**: Save design decisions for consistency

## Tech Stack

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Components**: Ant Design 5.x + @ant-design/icons
- **Design System**: 8px grid, WCAG AA accessibility

## Example Prompts

```
"Design a login form with email/password, social login buttons"

"Create a data table with sorting, filtering, pagination"

"Design a sidebar navigation with icons and collapse feature"

"Make a card component for user profiles with avatar and stats"

"Design a settings page with multiple tabs and form sections"
```

## Screenshot-to-Code

```
Convert this screenshot to React code: /path/to/screenshot.png
Target: Dashboard layout with sidebar, header, content area
```

## Files

```
ai-designer/
├── server.js          # MCP server
├── package.json       # Dependencies
├── QWEN.md           # Qwen Code config
├── settings.json      # MCP registration template
├── setup.sh          # Install script
├── commands/
│   └── design.md     # Design skill
└── README.md         # This file
```

## Troubleshooting

**MCP not loading?**
```bash
# Check if server runs
cd <PROJECT_ROOT>/ai-agents/ai-designer && node server.js
# Should see: "AI Designer MCP Server running on stdio"
```

**Dependencies missing?**
```bash
cd <PROJECT_ROOT>/ai-agents/ai-designer && npm install
```

**Settings not merged?**
```bash
# Manual merge
# Add to ~/.qwen/settings.json:
"mcpServers": {
  "ai-designer": {
    "command": "node",
    "args": ["<PROJECT_ROOT>/ai-agents/ai-designer/server.js"]
  }
}
```

---

_React + Tailwind CSS + Ant Design | Powered by Qwen Code_
