# AI DESIGNER - CLAUDE CODE CONFIG

## USER PROFILE

| Priority | Role |
|----------|------|
| 1 | **Frontend Design** (React, Tailwind CSS, Ant Design) |
| 2 | **UI/UX** (Beauty, Usability, Accessibility) |
| 3 | **Developer Experience** (Clean code, TypeScript, reusable) |

**Priority:** Design đẹp > Code sạch > Performance sau
**Stack:** React + TypeScript, Tailwind CSS, Ant Design 5.x, @ant-design/icons, Vite, React Router v6
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

_Version: 2.0 - Universal MCP (Claude/Qwen/Gemini) - React + Tailwind + Ant Design + Vite + React Router_
