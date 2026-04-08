---
name: ai-designer
description: Design beautiful UIs with React + Tailwind CSS + Ant Design. Generate components, preview in sandbox, apply to project.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# AI Designer Skill

Design production-ready React components with Tailwind CSS + Ant Design.

## Workflow

### Step 1: Discover Requirements
```
Use tool: design_discovery
- component_type: what are we building?
- project_path: (optional) for auto-detection
```

Answer the discovery questions or provide your own requirements.

### Step 2: Generate Design
```
Use tool: design_generate
- requirements: {from step 1}
- output_mode: "sandbox" (recommended) or "direct"
- design_style: "adaptive" (recommended) or specific style
```

### Step 3: Preview & Iterate
- If sandbox: preview in browser
- Request changes: "make it more minimal", "add animations", etc.
- Generate again with updated requirements

### Step 4: Apply to Project
```
Use tool: design_apply
- component_code: (from step 2)
- project_path: /path/to/your/project
- mode: "new" | "replace" | "merge"
```

## Design Principles

### Visual Hierarchy
- Clear primary/secondary/tertiary actions
- Proper heading levels (h1 > h2 > h3)
- Size contrast for importance

### Spacing
- 8px grid system (8, 16, 24, 32, 48, 64)
- Consistent gaps between elements
- Breathing room around content

### Typography
- Use system fonts or Inter/Poppins
- Max 2-3 font sizes per component
- Proper line-height (1.5 for body, 1.2 for headings)

### Colors
- Primary: Ant Design blue #1677ff
- Success: #52c41a
- Warning: #faad14
- Error: #ff4d4f
- Neutral scale: #1f1f1f → #8c8c8c → #d9d9d9 → #f5f5f5

### Accessibility
- WCAG AA contrast ratios
- Keyboard navigation
- ARIA labels where needed
- Focus visible states

## Ant Design Integration

### Common Components
- Layout, Menu, Avatar, Badge (navigation)
- Card, Statistic, Table (data display)
- Form, Input, Select, DatePicker (forms)
- Modal, Drawer, Popover (feedback)
- Button, Space, Divider (general)

### Import Pattern
```tsx
import { Button, Card, Space } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
```

## Style Presets

### Modern Minimal
- Clean whites and grays
- Subtle shadows
- Generous whitespace
- Crisp borders

### Glassmorphism
- Backdrop blur
- Semi-transparent backgrounds
- Gradient overlays
- Soft shadows

### Dark Neon
- Dark backgrounds (#141414)
- Vibrant accent colors
- High contrast
- Bold elements

### Adaptive (Recommended)
- AI chooses best style for context
- Considers purpose, audience, content

## Tips for Best Results

1. **Be specific about purpose**: "Admin dashboard header" > "header"
2. **Mention data needs**: "table with 1000 rows, paginated"
3. **Specify interactions**: "hover effects, loading states"
4. **Provide context**: "part of e-commerce checkout flow"
5. **Reference inspiration**: "like Stripe dashboard" or include screenshot

## Output Format

Components include:
- TypeScript types
- Responsive design (mobile-first)
- Loading/error states
- Accessible markup
- Clean, readable code
- CSS-in-JS or Tailwind classes
- Ant Design components where appropriate
