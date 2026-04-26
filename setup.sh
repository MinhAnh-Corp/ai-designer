#!/bin/bash
# ╔═══════════════════════════════════════════════════════════════╗
# ║  AI Designer — Setup Script for Claude Code + Gemini CLI     ║
# ║  MCP Server + Skills for React + Tailwind + Ant Design       ║
# ║  Run: bash setup.sh                                          ║
# ╚═══════════════════════════════════════════════════════════════╝

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# ── Detect OS ─────────────────────────────────────────────────
detect_os() {
  case "$(uname -s)" in
    Darwin*)  OS="mac" ;;
    Linux*)
      if grep -qi microsoft /proc/version 2>/dev/null; then
        OS="wsl"
      else
        OS="linux"
      fi
      ;;
    MINGW*|MSYS*|CYGWIN*)  OS="win" ;;
    *)  OS="unknown" ;;
  esac
}
detect_os

CLAUDE_DIR="$HOME/.claude"
GEMINI_DIR="$HOME/.gemini"
MCP_DIR="$CLAUDE_DIR/mcp/ai-designer"
COMMANDS_DIR="$CLAUDE_DIR/commands"

echo ""
echo "════════════════════════════════════════"
echo "  AI Designer — Setup for Claude + Gemini"
echo "  React + Tailwind + Ant Design"
echo "  OS: $OS ($(uname -s))"
echo "════════════════════════════════════════"
echo ""

# ── 1. Check prerequisites ───────────────────────────────────
echo "[1/4] Checking prerequisites..."

if ! command -v node &>/dev/null; then
  echo "  ❌ Node.js not found"
  exit 1
fi
NODE_VER=$(node -v)
echo "  ✅ Node.js $NODE_VER"

if [ -d "$REPO_DIR/ai-agent-auto" ]; then
  echo "  ✅ ai-agent-auto found (will integrate)"
else
  echo "  ⚠️  ai-agent-auto not found (optional)"
fi

echo ""

# ── 2. Install dependencies ──────────────────────────────────
echo "[2/4] Installing dependencies..."
cd "$REPO_DIR"
npm install
echo "  ✅ MCP server dependencies installed"
echo ""

# ── 3. Install MCP server for Claude Code ────────────────────
echo "[3/4] Installing MCP server for Claude Code..."
mkdir -p "$MCP_DIR" "$COMMANDS_DIR"
cp "$REPO_DIR/server.js" "$MCP_DIR/server.js"
cp "$REPO_DIR/package.json" "$MCP_DIR/package.json"
cp "$REPO_DIR/style-gallery.html" "$MCP_DIR/style-gallery.html" 2>/dev/null || true
cp "$REPO_DIR/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md" 2>/dev/null || true
cp "$REPO_DIR/commands/design.md" "$COMMANDS_DIR/design.md" 2>/dev/null || true
cp "$REPO_DIR/commands/UI-UX-GATES.md" "$COMMANDS_DIR/UI-UX-GATES.md" 2>/dev/null || true
echo "  ✅ ai-designer MCP installed → $MCP_DIR"
echo ""
echo "  Register with Claude Code:"
echo "    claude mcp add --scope user ai-designer node \"$MCP_DIR/server.js\""
echo "    claude mcp list   # should show ✓ Connected"
echo ""

# ── 4. Install MCP server for Gemini CLI ─────────────────────
echo "[4/4] Installing MCP server for Gemini CLI..."
GEMINI_MCP_DIR="$GEMINI_DIR/mcp/ai-designer"
mkdir -p "$GEMINI_MCP_DIR"
cp "$REPO_DIR/server.js" "$GEMINI_MCP_DIR/server.js"
cp "$REPO_DIR/package.json" "$GEMINI_MCP_DIR/package.json"
cp "$REPO_DIR/style-gallery.html" "$GEMINI_MCP_DIR/style-gallery.html" 2>/dev/null || true
echo "  ✅ ai-designer MCP installed → $GEMINI_MCP_DIR"
echo ""

# ── ai-agent-auto integration ────────────────────────────────
if [ -d "$REPO_DIR/ai-agent-auto" ]; then
  echo "════════════════════════════════════════"
  echo "  Integrating ai-agent-auto MCP"
  echo "════════════════════════════════════════"
  echo ""

  if [ -d "$HOME/.claude/mcp/parallel-orchestrator" ]; then
    echo "  ✅ parallel-orchestrator already installed"
    echo "  📍 Location: $HOME/.claude/mcp/parallel-orchestrator"
  else
    echo "  📦 Installing parallel-orchestrator from ai-agent-auto..."
    mkdir -p "$HOME/.claude/mcp/parallel-orchestrator"
    cp "$REPO_DIR/ai-agent-auto/MCP/parallel-orchestrator/server.js" "$HOME/.claude/mcp/parallel-orchestrator/server.js" 2>/dev/null || true
    cp "$REPO_DIR/ai-agent-auto/MCP/parallel-orchestrator/viewer.js" "$HOME/.claude/mcp/parallel-orchestrator/viewer.js" 2>/dev/null || true

    if [ -f "$HOME/.claude/mcp/parallel-orchestrator/server.js" ]; then
      echo "  ✅ parallel-orchestrator installed"

      if [ -f "$REPO_DIR/ai-agent-auto/MCP/parallel-orchestrator/package.json" ]; then
        cd "$HOME/.claude/mcp/parallel-orchestrator"
        npm install 2>/dev/null || echo "  ⚠️  Install deps manually: cd $HOME/.claude/mcp/parallel-orchestrator && npm install"
      fi
    else
      echo "  ⚠️  parallel-orchestrator not found in ai-agent-auto"
      echo "  📂 Check: $REPO_DIR/ai-agent-auto/MCP/parallel-orchestrator/"
    fi
  fi
  echo ""
fi

# ── Optional: ai-skills-cloned lookup library ─────────────────
echo "════════════════════════════════════════"
echo "  Optional: install ai-skills-cloned library"
echo "════════════════════════════════════════"
echo ""
echo "  FE/Designer skills lookup library (353 skills in ui-ux-designer/):"
echo ""
echo "    git clone git@github.com:MinhAnh-Corp/ai-skills-cloned.git /path/to/workspace/ai-skills-cloned"
echo "    cd /path/to/workspace/ai-skills-cloned && bash install-skills.sh"
echo ""
echo "  Then reference from AI via lazy lookup:"
echo "    rg -l 'responsive|accessibility' ai-skills-cloned/ui-ux-designer/ --type md"
echo ""

# ── Done ─────────────────────────────────────────────────────
echo "════════════════════════════════════════"
echo "  Setup Complete! ($OS)"
echo "════════════════════════════════════════"
echo ""
echo "  Claude MCP:  $MCP_DIR/server.js"
echo "  Gemini MCP:  $GEMINI_MCP_DIR/server.js"
echo "  Commands:    $COMMANDS_DIR/design.md"
echo ""
echo "  Next steps:"
echo "  1. Restart Claude Code / Gemini CLI to load MCP"
echo "  2. Start designing:"
echo "     - Use tool: discover_business"
echo "     - Then: discover_pages → scaffold_project → design_generate → design_apply_page"
echo ""
echo "  Quick start:"
echo "  \"Design a dashboard header component for my admin panel\""
echo ""
echo "  ai-agent-auto integration:"
echo "  - parallel-orchestrator: $HOME/.claude/mcp/parallel-orchestrator/"
echo "  - Use /audit, /review, /debug commands"
echo ""
