# AI DESIGNER - CLAUDE CODE CONFIG

## USER PROFILE

| Priority | Role |
|----------|------|
| 1 | **Frontend Master** (React, Next.js, Tailwind, Ant Design, design systems) |
| 2 | **UI/UX Designer Master** (Visual design, beauty, usability, accessibility) |
| 3 | **Developer Experience** (Clean code, TypeScript, reusable) |

## SKILL LIBRARY (FE/Designer specific)

This MCP owns the **Frontend Master** and **Designer Master** roles. All frontend/design skill lookups happen here, not in the global `ai-agent-auto` rules.

**Primary library:** `ai-skills-cloned/ui-ux-designer/` (353 skills)

Key skill categories in that folder:
- Design systems (type-system, color-palette, tokens)
- Component patterns (design-screen, responsive-audit)
- Accessibility (WCAG AA/AAA, keyboard nav, ARIA)
- Layout & grid (8dp grid, responsive breakpoints)
- Motion (micro-interactions, framer-motion patterns)

**Lookup pattern:**
```bash
# Task: design a pricing card
rg -l "pricing\|card\|component" ai-skills-cloned/ui-ux-designer/ --type md

# Task: audit responsive layout
rg -l "responsive\|breakpoint\|mobile-first" ai-skills-cloned/ui-ux-designer/
```

Load only top 1-3 matching skill files — NEVER grep the full library into context.

**Role separation:**
- **Claude Code (primary) + Qwen Code (secondary)** handle Blockchain + Backend (via `ai-agent-auto` rules)
- **This ai-designer MCP** handles Frontend Master + Designer Master (via `ui-ux-designer` skills)
- Cross-role: FE task that touches API/backend → delegate back to Claude

---

**Priority:** Design đẹp > Code sạch > Performance sau
**Stack:** React + TypeScript, Tailwind CSS, Ant Design 5.x, @ant-design/icons, Vite, React Router v6
**Package Manager:** **Yarn v1 (1.22.22)** or **pnpm** — NEVER npm
**Install Rule:** ALWAYS `yarn add <package>` (no version pinning) — get latest
**Charts/UI:** ALWAYS use React packages (recharts, react-chartjs-2, @ant-design/charts)
**Animations:** ALWAYS use `framer-motion` for real-time updates (cards, charts, waves)
**Dummy Data:** ALWAYS include random dummy data for real-time UI previews
**Goal:** Dev không có kinh nghiệm design → AI tạo design đẹp, production-ready

---

## NGUYÊN TẮC DESIGN

### 1. ĐẸP LÀ TRÊN HẾT
- Visual hierarchy rõ ràng
- Spacing đều đặn (8px grid)
- Typography có chủ đích
- Màu sắc hài hòa
- Micro-interactions tinh tế

### 2. PRODUCTION-READY
- TypeScript types đầy đủ
- Responsive (mobile-first)
- Accessible (WCAG AA)
- Loading/error states
- Clean, maintainable code

### 3. WORKFLOW CHUẨN
```
1. discover_business → Hỏi business domain, platform, style
2. discover_pages → Suggest pages & components
3. scaffold_project → Tạo Vite project
4. design_generate → Generate từng page
5. design_apply_page → Apply vào project
```

### 4. KHÔNG TỰ Ý
- ❌ Không tạo file mới nếu không được yêu cầu
- ❌ Không install package tự động → chỉ gợi ý lệnh
- ❌ Không commit code design
- ✅ Luôn hỏi trước khi thay đổi lớn
- ✅ Luôn gợi ý pages/components trước

---

## DESIGN SYSTEM

### Colors (Ant Design Default)
```
Primary:    #1677ff (Blue)
Success:    #52c41a (Green)
Warning:    #faad14 (Gold)
Error:      #ff4d4f (Red)

Text:       #1f1f1f (Primary)
            #8c8c8c (Secondary)
            #bfbfbf (Tertiary)

Border:     #d9d9d9
Background: #ffffff (Light)
            #141414 (Dark)
```

### Spacing (8px Grid)
```
xs:  4px   sm:  8px   md:  16px   lg:  24px
xl:  32px  2xl: 48px  3xl: 64px
```

### Typography
```
Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
Heading:     font-semibold, line-height 1.2
Body:        font-normal, line-height 1.5
```

### Ant Design Components
```
Layout:       Layout, Sider, Header, Content, Footer
Navigation:   Menu, Breadcrumb, Tabs, Pagination
Data Display: Card, Table, List, Timeline, Badge, Avatar
Forms:        Form, Input, Select, DatePicker, Upload
Feedback:     Modal, Drawer, Message, Notification, Alert
Buttons:      Button, Space, Dropdown
```

---

## MCP TOOLS (Universal: Claude/Qwen/Gemini)

### 1. discover_business
Ask BEFORE designing:
- Business domain (ecommerce, saas, blog, portfolio, social, admin, landing, custom)
- Project name
- Target audience (general, enterprise, developer, consumer, internal)
- Platform (web, mobile_web, pwa, desktop)
- Design style (open gallery: ~/.qwen/mcp/ai-designer/style-gallery.html)

### 2. discover_pages
After business discovery:
- Suggest pages based on domain
- Each page has components
- User can modify: add/remove components

### 3. scaffold_project
Create Vite + React Router + Tailwind + Ant Design project:
- Generate commands for user to run
- Show project structure
- Setup router with all pages

### 4. design_generate
Generate a specific page:
- page_name, components, design_style
- output_mode: sandbox | direct | file
- Generate page code + component codes

### 5. design_generate_all
Batch generate all pages:
- sequential or parallel mode
- Show progress

### 6. design_apply_page
Apply generated page to project:
- Create files
- Update router
- Show what was created

---

## PROMPT TEMPLATES

### Start Designing
```
discover_business with user_input: "I want to build an ecommerce website for electronics"
```

### After Business Discovery
```
discover_pages with business_domain: "ecommerce"
```

### Generate All Pages
```
design_generate_all with:
- pages: [from discover_pages]
- design_style: "modern_minimal"
- project_path: "/path/to/project"
- generate_sequentially: true
```

### Apply Page
```
design_apply_page with:
- page_name: "Home"
- page_code: [generated code]
- component_codes: [component codes]
- project_path: "/path/to/project"
- route: "/"
```

---

## BUSINESS DOMAIN TEMPLATES

### E-Commerce (6 pages)
Home, Product List, Product Detail, Cart, Checkout, User Profile

### SaaS Dashboard (5 pages)
Dashboard, Analytics, Users, Settings, Reports

### Blog (5 pages)
Home, Article List, Article Detail, Author Page, About

### Portfolio (5 pages)
Home, Work, Services, About, Contact

### Social Network (5 pages)
Feed, Profile, Messages, Notifications, Settings

### Admin Panel (5 pages)
Dashboard, Data Table, Form Page, Detail View, Settings

### Landing Page (1 page)
Landing (Hero, Features, Pricing, Testimonials, FAQ, CTA)

---

## DESIGN STYLES (12 options)

| Style | Vibe | Best For |
|-------|------|----------|
| modern_minimal | Clean, Apple | SaaS, Portfolio |
| glassmorphism | Frosted glass | Modern, Creative |
| dark_neon | Cyberpunk | Gaming, Tech |
| neumorphism | Soft, tactile | iOS-like |
| brutalism | Bold, raw | Art, Fashion |
| gradient_mesh | Dreamy | Creative, Landing |
| aurora | Calming | Wellness |
| clay | Warm, friendly | Food, Lifestyle |
| retro | Vintage | Classic |
| holographic | Futuristic | Crypto, Web3 |
| bento_grid | Organized | Dashboard, Admin |
| flat_design | Simple | Corporate |
| adaptive | AI decides | Let AI choose |

---

## QUALITY CHECKLIST

Before outputting design:

### Visual ✓
- [ ] Clear visual hierarchy
- [ ] Consistent spacing (8px grid)
- [ ] Proper color contrast
- [ ] Typography scale consistent

### Technical ✓
- [ ] TypeScript types defined
- [ ] Responsive breakpoints
- [ ] Accessible markup (ARIA)
- [ ] Loading state handled
- [ ] Error state handled
- [ ] Interactive states (hover, focus, active)

### Integration ✓
- [ ] Ant Design components used correctly
- [ ] Tailwind classes clean
- [ ] Imports organized
- [ ] Props interface defined
- [ ] Export default

---

# 10 UI/UX GATES — FAIL bất kỳ gate = KHÔNG production

| Gate | Tên | Priority | Key Rules |
|------|-----|----------|-----------|
| UI-1 | **Accessibility (WCAG 2.2)** | Critical | 4.5:1 contrast, focus rings 2-4px, 44x44px touch targets, ARIA labels, keyboard nav, reduced motion, no color-only info, form labels, alt text |
| UI-2 | **Layout & Responsive** | High | Mobile-first, viewport meta, no horizontal scroll, 16px min body, `min-h-dvh` not `h-screen`, z-index scale (10/20/50), 4/8dp spacing |
| UI-3 | **Visual Hierarchy** | High | 1.5x size distinction, one primary CTA per screen, squint test, spacing = importance, density isolation |
| UI-4 | **Animation & Transitions** | Medium | 150-300ms micro, transform/opacity ONLY, ease-out enter/ease-in exit, stagger 30-50ms, reduced motion, exit 60-70% of enter |
| UI-5 | **Loading & Error States** | High | Show instantly (never blank), skeleton matches content shape, error = what+why+fix, preserve input on error, focus invalid field |
| UI-6 | **Forms & Feedback** | Medium | Visible labels (not placeholder-only), inline validation on blur, loading buttons disabled, semantic input types, toast 3-5s auto-dismiss |
| UI-7 | **Color & Typography** | Medium | 1.5-1.75 line height, semantic color tokens (no raw hex), dark mode desaturate 10-20%, off-white text (#E0E0E0), tabular figures for data |
| UI-8 | **Navigation Patterns** | High | Max 5 bottom nav items (icon+text), predictable back + state preservation, deep linking all screens, modal escape, adaptive nav (sidebar/sheet) |
| UI-9 | **Performance** | High | WebP/AVIF images, CLS < 0.1 (declare dimensions), font-display: swap, virtualize lists 50+, debounce scroll/resize, main thread <16ms |
| UI-10 | **Tailwind v4 Syntax** | Critical | `@import "tailwindcss"`, `@theme` config, `/50` opacity, `bg-linear-to-r`, `shadow-xs`, `bg-color!` (important at end), `bg-(--var)` |

## Pre-Delivery Checklist
- [ ] Visual hierarchy clear (one primary action, 1.5x size distinction)
- [ ] Spacing consistent (4/8dp scale, NO arbitrary values)
- [ ] Contrast >=4.5:1 both light/dark mode
- [ ] No emojis as icons (SVG: Phosphor/Heroicons/Lucide)
- [ ] Touch targets >=44x44px, focus rings visible
- [ ] Loading skeleton matches content shape
- [ ] Error messages: what + why + how to fix
- [ ] Tailwind v4 syntax correct (@import, @theme, /opacity, bg-linear-to-)
- [ ] Dark mode: desaturate colors, off-white text (#E0E0E0)

---

## INTEGRATION WITH AI-AGENT-AUTO

When working in project with ai-agent-auto MCP:

1. **Use parallel-orchestrator** for complex tasks
2. **Index project first**: `orchestrate action=index project_path=/path`
3. **Search existing patterns**: `orchestrate action=search query="header component"`
4. **Follow existing style**: Check similar components
5. **Use memory**: Save design decisions for consistency

### Commands from ai-agent-auto
- `/audit` - Audit design quality
- `/review` - Review before commit
- `/debug` - Debug layout issues
- `/verify` - Verify responsive, accessible

---

# AGENT SKILLS LIBRARY

## Installed Skills (25 total)

Skills are located in `skills/` directory and auto-activate based on context.

### Frontend Design (6 skills)
- **frontend-design** (Anthropic) - Create distinctive, production-grade interfaces with bold aesthetic direction
- **react-best-practices** (Vercel) - 69 React/Next.js performance checks
- **web-design-guidelines** (Vercel) - 100+ rules for accessibility, performance, UX
- **react-native-skills** - React Native patterns
- **composition-patterns** - React composition patterns
- **react-view-transitions** - View Transition API animations

### UI/UX Design (9 skills)
Responsive design, iOS/Android design patterns, design systems, interaction design, visual design, web component design, React Native design, accessibility compliance.

### Frontend Development (4 skills)
Next.js App Router, React state management, Tailwind design systems, JavaScript/TypeScript patterns.

### Accessibility (2 skills)
WCAG audit patterns, screen reader testing.

## Skill Location
- **ai-agent-auto:** `skills/` directory (blockchain, backend, cloud, security, DevOps) - 112 skills
- **ai-designer:** `skills/` directory (frontend, UI/UX, design systems, accessibility) - 25 skills

## Sources
- `anthropics/skills` - Official Anthropic skills (frontend-design)
- `vercel-labs/agent-skills` - React/Next.js best practices (5 skills)
- `wshobson/agents` - UI/UX, frontend/mobile, JavaScript/TypeScript (19 skills)

---

_Version: 2.0 - Universal MCP (Claude/Qwen/Gemini) - React + Tailwind + Ant Design + Vite + React Router_
