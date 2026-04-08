# 🎨 AI Designer MCP - Quick Start

Universal AI Designer for **Claude Code / Qwen Code / Gemini CLI**

## Workflow Overview

```
1. discover_business    → Business domain, platform, style
2. discover_pages       → Pages & components
3. scaffold_project     → Vite + React Router + Tailwind + Ant Design
4. design_generate      → Generate each page (or all at once)
5. design_apply_page    → Apply to project
```

## Quick Start (5 minutes)

### Step 1: Restart your AI CLI
Restart Qwen Code / Claude Code / Gemini CLI to load the new MCP.

### Step 2: Open Style Gallery
```bash
open ~/.qwen/mcp/ai-designer/style-gallery.html
```
Browse 12 design styles, click your favorite, copy the style name.

### Step 3: Start Designing
Tell AI:
```
I want to build an ecommerce website
```

AI will automatically:
1. Run `discover_business` → Ask domain, platform, style
2. Run `discover_pages` → Suggest pages & components
3. Run `scaffold_project` → Create Vite project
4. Run `design_generate` → Generate each page
5. Run `design_apply_page` → Apply to your project

## Example Conversation

**You:** "I want to build an ecommerce website for selling electronics"

**AI:** (runs discover_business)
```
 Business Discovery

1. Business Domain: ✅ Detected "ecommerce"
2. Project Name: ShopVN
3. Target Audience: consumer
4. Platform: 🌐 Website
5. Design Style: Open ~/.qwen/mcp/ai-designer/style-gallery.html and pick one!

Style options: Modern Minimal, Glassmorphism, Dark Neon, Neumorphism, 
Brutalism, Gradient Mesh, Aurora, Clay, Retro, Holographic, Bento Grid, Flat Design
```

**You:** "modern_minimal"

**AI:** (runs discover_pages)
```
📄 Suggested Pages:
1. Home - Hero Banner, Featured Products, Categories, Newsletter
2. Product List - Filters, Product Grid, Sort Options, Pagination
3. Product Detail - Image Gallery, Product Info, Add to Cart, Reviews
4. Cart - Cart Items, Summary, Checkout Button
5. Checkout - Shipping Form, Payment Form, Order Summary
6. User Profile - Order History, Address Book, Settings

Accept or modify?
```

**You:** "Looks good, proceed"

**AI:** (runs scaffold_project)
```
🔨 Creating project: ShopVN
- Vite + React + TypeScript
- React Router (6 pages)
- Tailwind CSS
- Ant Design 5.x
- Style: Modern Minimal

Run these commands:
1. npm create vite@latest ShopVN --template react-ts
2. cd ShopVN && npm install react-router-dom antd @ant-design/icons
3. npm install -D tailwindcss postcss autoprefixer
```

**You:** (run commands)

**AI:** (runs design_generate for each page)
```
🎨 Generating: Home page (Modern Minimal style)
✅ Page code generated
✅ 4 components generated

Preview in: /tmp/ai-designer/home
Or apply directly to project
```

**You:** "Apply it"

**AI:** (runs design_apply_page)
```
✅ Home page applied to project!
Files created:
- src/pages/Home.tsx
- src/components/HeroBanner.tsx
- src/components/FeaturedProducts.tsx
- src/components/Categories.tsx
- src/components/Newsletter.tsx

Update router in App.tsx (code provided above)
```

## Available Tools

| Tool | When to Use |
|------|-------------|
| `discover_business` | FIRST - Understand your project |
| `discover_pages` | After business discovery - Define pages |
| `scaffold_project` | After pages - Create project structure |
| `design_generate` | Generate a specific page |
| `design_generate_all` | Generate all pages at once |
| `design_apply_page` | Apply generated page to project |

## Business Domains (Auto-suggest)

| Domain | Pages | Best For |
|--------|-------|----------|
| ecommerce | 6 pages | Online store |
| saas_dashboard | 5 pages | Analytics, metrics |
| blog | 5 pages | Content, articles |
| portfolio | 5 pages | Agency, showcase |
| social | 5 pages | Social network |
| admin | 5 pages | CRUD, management |
| landing | 1 page | Marketing, conversion |
| custom | You define | Anything |

## Design Styles (12 options)

| Style | Vibe | Best For |
|-------|------|----------|
| modern_minimal | Clean, Apple | SaaS, Portfolio |
| glassmorphism | Frosted glass | Modern, Creative |
| dark_neon | Cyberpunk | Gaming, Tech |
| neumorphism | Soft, tactile | iOS-like |
| brutalism | Bold, raw | Art, Fashion |
| gradient_mesh | Dreamy | Creative, Landing |
| aurora | Calming | Wellness, Nature |
| clay | Warm, friendly | Food, Lifestyle |
| retro | Vintage | Classic, Heritage |
| holographic | Futuristic | Crypto, Web3 |
| bento_grid | Organized | Dashboard, Admin |
| flat_design | Simple | Corporate, Clean |
| adaptive | AI decides | Let AI choose |

## Tech Stack Generated

- **Framework**: React 18 + TypeScript
- **Router**: React Router v6
- **Styling**: Tailwind CSS 3.x
- **Components**: Ant Design 5.x
- **Icons**: @ant-design/icons
- **Build**: Vite 5.x
- **Package Manager**: npm / yarn / pnpm

## Project Structure

```
my-app/
├── src/
│   ├── components/       # Shared components
│   │   ├── Layout/       # Header, Sidebar, Footer
│   │   └── shared/       # Reusable UI
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── App.tsx           # Router setup
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind + globals
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Tips

### For Best Results:
1. **Be specific**: "Ecommerce for electronics" > "website"
2. **Pick style first**: Open gallery, choose style before starting
3. **Review pages**: Check suggested pages, add/remove components
4. **One page at a time**: Generate → preview → apply → next page
5. **Customize after**: AI generates base, you tweak details

### Common Modifications:
```
"Add a search bar to the Home page"
"Remove Newsletter from Home, add Testimonials"
"Make Dashboard have 4 stat cards instead of 3"
"Add dark mode support to all pages"
```

## Troubleshooting

**MCP tools not showing?**
```bash
# Restart your AI CLI
# Or check: cat ~/.qwen/settings.json | grep ai-designer
```

**Gallery not opening?**
```bash
open ~/.qwen/mcp/ai-designer/style-gallery.html
```

**Server not running?**
```bash
node ~/.qwen/mcp/ai-designer/server.js
# Should see: "AI Designer MCP Server v2.0 running on stdio"
```

---

_Universal MCP: Works with Claude Code, Qwen Code, Gemini CLI_
