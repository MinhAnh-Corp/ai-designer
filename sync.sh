#!/bin/bash
# ╔═══════════════════════════════════════════════════════════╗
# ║  AI Designer — Sync Script                               ║
# ║  Sync MCP server from git repo to local Claude/Qwen/Gemini ║
#   Run: bash sync.sh                                       ║
# ╚═══════════════════════════════════════════════════════════╝

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "════════════════════════════════════════"
echo "  AI Designer — Sync to Local"
echo "════════════════════════════════════════"
echo ""

# Pull latest from git
echo "[1/4] Pulling latest from git..."
cd "$REPO_DIR"
git pull origin main 2>/dev/null || echo "  ⚠️  Git pull skipped (no remote or already latest)"
echo "  ✅ Latest code ready"
echo ""

# Sync to Claude Code
echo "[2/4] Syncing to Claude Code..."
mkdir -p ~/.claude/mcp/ai-designer
cp "$REPO_DIR/server.js" ~/.claude/mcp/ai-designer/
cp "$REPO_DIR/style-gallery.html" ~/.claude/mcp/ai-designer/
cp "$REPO_DIR/package.json" ~/.claude/mcp/ai-designer/
cd ~/.claude/mcp/ai-designer && npm install --silent 2>/dev/null
echo "  ✅ ~/.claude/mcp/ai-designer/"
echo ""

# Sync to Qwen Code
echo "[3/4] Syncing to Qwen Code..."
mkdir -p ~/.qwen/mcp/ai-designer
cp "$REPO_DIR/server.js" ~/.qwen/mcp/ai-designer/
cp "$REPO_DIR/style-gallery.html" ~/.qwen/mcp/ai-designer/
cp "$REPO_DIR/package.json" ~/.qwen/mcp/ai-designer/
cd ~/.qwen/mcp/ai-designer && npm install --silent 2>/dev/null
echo "  ✅ ~/.qwen/mcp/ai-designer/"
echo ""

# Sync to Gemini CLI
echo "[4/4] Syncing to Gemini CLI..."
mkdir -p ~/.gemini/mcp/ai-designer
cp "$REPO_DIR/server.js" ~/.gemini/mcp/ai-designer/
cp "$REPO_DIR/style-gallery.html" ~/.gemini/mcp/ai-designer/
cp "$REPO_DIR/package.json" ~/.gemini/mcp/ai-designer/
cd ~/.gemini/mcp/ai-designer && npm install --silent 2>/dev/null
echo "  ✅ ~/.gemini/mcp/ai-designer/"
echo ""

echo "════════════════════════════════════════"
echo "  ✅ Sync Complete!"
echo "════════════════════════════════════════"
echo ""
echo "  Next: Restart Claude Code / Qwen Code / Gemini CLI"
echo ""
