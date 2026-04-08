# AI DESIGNER - QWEN CODE CONFIG

## USER PROFILE

| Priority | Role |
|----------|------|
| 1 | **Frontend Design** (React, Tailwind CSS, Ant Design) |
| 2 | **UI/UX** (Beauty, Usability, Accessibility) |
| 3 | **Developer Experience** (Clean code, TypeScript, reusable) |

**Priority:** Design đẹp > Code sạch > Performance sau
**Stack:** React + TypeScript, Tailwind CSS, Ant Design 5.x, @ant-design/icons
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

### 3. FOLLOW EXISTING PATTERNS
- Check project structure trước
- Follow code style hiện có
- Reuse existing components
- Match design system nếu có

### 4. WORKFLOW CHUẨN
```
1. design_discovery → Hỏi requirements
2. design_generate → Tạo component trong sandbox
3. Preview → User review
4. Iterate → Sửa đến khi ưng
5. design_apply → Copy vào project
```

### 5. KHÔNG TỰ Ý
- ❌ Không tạo file mới nếu không được yêu cầu
- ❌ Không install package tự động → chỉ gợi ý
- ❌ Không commit code design
- ✅ Luôn hỏi trước khi thay đổi lớn
- ✅ Luôn preview trong sandbox trước

---

## DESIGN SYSTEM

### Colors (Ant Design Default)
```
Primary:    #1677ff (Blue)
Success:    #52c41a (Green)
Warning:    #faad14 (Gold)
Error:      #ff4d4f (Red)
Info:       #1677ff (Blue)

Text:       #1f1f1f (Primary)
            #8c8c8c (Secondary)
            #bfbfbf (Tertiary)

Border:     #d9d9d9
Background: #ffffff (Light)
            #141414 (Dark)
```

### Spacing (8px Grid)
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

### Typography
```
Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
Heading:     font-semibold, line-height 1.2
Body:        font-normal, line-height 1.5
Small:       text-sm, text-gray-500
```

### Ant Design Components Mapping
```
Layout:       Layout, Sider, Header, Content, Footer
Navigation:   Menu, Breadcrumb, Tabs, Pagination
Data Display: Card, Table, List, Timeline, Badge, Avatar
Forms:        Form, Input, Select, DatePicker, Upload, Switch
Feedback:     Modal, Drawer, Message, Notification, Alert
Buttons:      Button, Space, Dropdown
```

---

## MCP TOOLS

### 1. design_discovery
Ask questions BEFORE designing:
- Purpose? Target audience? Key actions?
- Color scheme? Existing design system?
- Data source? Responsive needs?

### 2. design_generate
Generate component:
- output_mode: "sandbox" (default) or "direct"
- design_style: "adaptive" (default) or specific
- Include: responsive, animations, dark_mode, loading_states, error_handling

### 3. design_variants
Generate 2-3 variants to compare:
- Different styles per variant
- User chooses best

### 4. design_apply
Apply to existing project:
- mode: "new" | "replace" | "merge"
- Adjust imports
- Handle dependencies

### 5. screenshot_to_code
Convert screenshot to code:
- Analyze layout, colors, spacing
- Generate equivalent React component

### 6. design_review
Review & suggest improvements:
- Visual hierarchy, spacing, typography
- Colors, accessibility, responsive
- Interactions, loading/error states

---

## PROMPT TEMPLATES

### Generate Component
```
Design a [component_type] for [purpose]:
- Target: [audience]
- Key actions: [actions]
- Style: [modern_minimal/glassmorphism/dark_neon/adaptive]
- Features: [responsive, animations, dark_mode, etc.]
- Data: [API/mock/local]
- Reference: [screenshot or description]
```

### Iterate on Design
```
Make these changes to the design:
- [specific change 1]
- [specific change 2]
- Keep: [what to preserve]
```

### Apply to Project
```
Apply this design to my project:
- Project path: /path/to/project
- Target file: src/components/XXX.tsx (or new file)
- Mode: replace existing OR create new
- Adjust imports to match my structure
```

---

## QUALITY CHECKLIST

Before outputting design:

### Visual ✓
- [ ] Clear visual hierarchy
- [ ] Consistent spacing (8px grid)
- [ ] Proper color contrast
- [ ] Typography scale consistent
- [ ] Breathing room around content

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

_Version: 1.0 - React + Tailwind + Ant Design_
