#!/bin/bash
# ╔═══════════════════════════════════════════════════════════════╗
# ║  AI Designer — Setup Script for Qwen Code                    ║
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

# ── Set paths ─────────────────────────────────────────────────
if [ "$OS" = "win" ]; then
  APPDATA_DIR="${APPDATA:-$HOME/AppData/Roaming}"
  if [[ "$APPDATA_DIR" == *":"* ]]; then
    APPDATA_DIR="$(echo "$APPDATA_DIR" | sed 's|\\|/|g' | sed 's|^\([A-Za-z]\):|/\L\1|')"
  fi
  QWEN_DIR="$HOME/.qwen"
else
  QWEN_DIR="$HOME/.qwen"
fi

MCP_DIR="$QWEN_DIR/mcp/ai-designer"
SKILLS_DIR="$QWEN_DIR/skills"

echo ""
echo "════════════════════════════════════════"
echo "  AI Designer — Setup for Qwen Code"
echo "  React + Tailwind + Ant Design"
echo "  OS: $OS ($(uname -s))"
echo "════════════════════════════════════════"
echo ""

# ── 1. Check prerequisites ───────────────────────────────────
echo "[1/5] Checking prerequisites..."

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
echo "[2/5] Installing dependencies..."
cd "$REPO_DIR"
npm install
echo "  ✅ MCP server dependencies installed"
echo ""

# ── 3. Create directories ────────────────────────────────────
echo "[3/5] Creating directories..."
mkdir -p "$MCP_DIR" "$SKILLS_DIR"
echo "  ✅ $MCP_DIR"
echo "  ✅ $SKILLS_DIR"
echo ""

# ── 4. Copy MCP server ───────────────────────────────────────
echo "[4/5] Installing MCP server..."
cp "$REPO_DIR/server.js" "$MCP_DIR/server.js"
cp "$REPO_DIR/package.json" "$MCP_DIR/package.json"
echo "  ✅ server.js → $MCP_DIR/"
echo "  ✅ package.json → $MCP_DIR/"
echo ""

# ── 5. Setup Qwen Code config ────────────────────────────────
echo "[5/5] Configuring Qwen Code..."

NODE_PATH=$(command -v node)

if [ "$OS" = "win" ]; then
  NODE_PATH_JSON="$(echo "$NODE_PATH" | sed 's|^/\([a-z]\)/|\U\1:/|' | sed 's|/|\\\\|g')"
  MCP_DIR_JSON="$(echo "$MCP_DIR/server.js" | sed 's|^/\([a-z]\)/|\U\1:/|' | sed 's|/|\\\\|g')"
  PROJECT_PATH_JSON="$(echo "$REPO_DIR" | sed 's|^/\([a-z]\)/|\U\1:/|' | sed 's|/|\\\\|g')"
else
  NODE_PATH_JSON="$NODE_PATH"
  MCP_DIR_JSON="$MCP_DIR/server.js"
  PROJECT_PATH_JSON="$REPO_DIR"
fi

# Copy QWEN.md to .qwen directory
cp "$REPO_DIR/QWEN.md" "$QWEN_DIR/QWEN.md"
echo "  ✅ QWEN.md → $QWEN_DIR/"

# Backup existing settings
if [ -f "$QWEN_DIR/settings.json" ]; then
  echo "  ⚠️  settings.json already exists"
  echo "  Merging AI Designer config..."
  
  # Merge MCP servers
  if command -v jq &>/dev/null; then
    jq --arg mcp "$MCP_DIR_JSON" --arg node "$NODE_PATH_JSON" --arg proj "$PROJECT_PATH_JSON" '
      .mcpServers["ai-designer"] = {
        "command": $node,
        "args": [$mcp]
      } |
      .permissions.allow += ["mcp__ai_designer__*"] |
      .hooks.SessionStart = [
        {
          "matcher": "",
          "command": "bash -c '\''echo \"💡 AI Designer loaded. Use design_discovery tool to start designing.\"'\''"
        }
      ] |
      .hooks.UserPromptSubmit = [
        {
          "matcher": "design|ui|component|layout|frontend",
          "command": "bash -c '\''echo \"🎨 Design request detected. Consider using design_discovery first.\"'\''"
        }
      ]
    ' "$QWEN_DIR/settings.json" > "$QWEN_DIR/settings.json.tmp" && \
    mv "$QWEN_DIR/settings.json.tmp" "$QWEN_DIR/settings.json"
    echo "  ✅ settings.json merged"
  else
    echo "  ⚠️  jq not found. Manual merge required."
    echo "  Add to $QWEN_DIR/settings.json:"
    echo ""
    echo "  \"mcpServers\": {"
    echo "    \"ai-designer\": {"
    echo "      \"command\": \"$NODE_PATH_JSON\","
    echo "      \"args\": [\"$MCP_DIR_JSON\"]"
    echo "    }"
    echo "  }"
    echo ""
  fi
else
  # Create new settings with project path substituted
  sed "s|<PROJECT_PATH>|$PROJECT_PATH_JSON|g; s|<HOME>|$HOME|g" "$REPO_DIR/settings.json" > "$QWEN_DIR/settings.json"
  echo "  ✅ settings.json → $QWEN_DIR/"
fi

# Copy design skill
cp "$REPO_DIR/commands/design.md" "$SKILLS_DIR/design.md"
echo "  ✅ design.md skill → $SKILLS_DIR/"
echo ""

# ── Setup ai-agent-auto integration ──────────────────────────
if [ -d "$REPO_DIR/ai-agent-auto" ]; then
  echo "════════════════════════════════════════"
  echo "  Integrating ai-agent-auto MCP"
  echo "════════════════════════════════════════"
  echo ""
  
  # Check if parallel-orchestrator is already installed
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
      
      # Install dependencies if needed
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

# ── Done ─────────────────────────────────────────────────────
echo "════════════════════════════════════════"
echo "  Setup Complete! ($OS)"
echo "════════════════════════════════════════"
echo ""
echo "  MCP Server:  $MCP_DIR/server.js"
echo "  Skills:      $SKILLS_DIR/design.md"
echo "  Config:      $QWEN_DIR/QWEN.md"
echo "  Settings:    $QWEN_DIR/settings.json"
echo ""
echo "  Next steps:"
echo "  1. Restart Qwen Code to load MCP"
echo "  2. Start designing:"
echo "     - Use tool: design_discovery"
echo "     - Then: design_generate"
echo "     - Preview in sandbox"
echo "     - Finally: design_apply"
echo ""
echo "  Quick start:"
echo "  \"Design a dashboard header component for my admin panel\""
echo ""
echo "  ai-agent-auto integration:"
echo "  - parallel-orchestrator: $HOME/.claude/mcp/parallel-orchestrator/"
echo "  - Skills from ai-agent-auto available in Qwen Code"
echo "  - Use /audit, /review, /debug commands"
echo ""
