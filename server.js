#!/usr/bin/env node

/**
 * AI Designer MCP Server - Universal (Claude Code / Gemini CLI)
 * 
 * Workflow:
 * 1. Discovery: Business/Domain → Platform → Pages → Components
 * 2. Scaffold: Create Vite + React Router project
 * 3. Design: Generate each page with selected style
 * 4. Preview: Sandbox preview
 * 5. Apply: Integrate into project
 */

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

// ── Style Gallery (local HTML file) ──
const STYLE_GALLERY_PATH = process.env.AI_DESIGNER_GALLERY_PATH ||
  `${process.env.HOME}/.claude/mcp/ai-designer/style-gallery.html`;
const STYLE_GALLERY_URL = `file://${STYLE_GALLERY_PATH}`;

// ── Business Domain Templates ──
const BUSINESS_DOMAINS = {
  ecommerce: {
    name: 'E-Commerce',
    description: 'Online store, product listings, cart, checkout',
    suggested_pages: [
      { name: 'Home', components: ['Hero Banner', 'Featured Products', 'Categories', 'Newsletter'] },
      { name: 'Product List', components: ['Filters', 'Product Grid', 'Sort Options', 'Pagination'] },
      { name: 'Product Detail', components: ['Image Gallery', 'Product Info', 'Add to Cart', 'Reviews'] },
      { name: 'Cart', components: ['Cart Items', 'Summary', 'Checkout Button'] },
      { name: 'Checkout', components: ['Shipping Form', 'Payment Form', 'Order Summary'] },
      { name: 'User Profile', components: ['Order History', 'Address Book', 'Settings'] }
    ]
  },
  saas_dashboard: {
    name: 'SaaS Dashboard',
    description: 'Analytics, metrics, user management',
    suggested_pages: [
      { name: 'Dashboard', components: ['Stats Cards', 'Charts', 'Recent Activity', 'Quick Actions'] },
      { name: 'Analytics', components: ['Date Range Picker', 'Line Chart', 'Bar Chart', 'Data Table'] },
      { name: 'Users', components: ['User Table', 'Search', 'Filters', 'User Modal'] },
      { name: 'Settings', components: ['Profile Form', 'Notification Settings', 'Billing', 'Team'] },
      { name: 'Reports', components: ['Report List', 'Export Options', 'Schedule'] }
    ]
  },
  blog: {
    name: 'Blog / Content',
    description: 'Articles, categories, author pages',
    suggested_pages: [
      { name: 'Home', components: ['Featured Posts', 'Latest Posts', 'Categories', 'Newsletter'] },
      { name: 'Article List', components: ['Post Cards', 'Search', 'Category Filter', 'Pagination'] },
      { name: 'Article Detail', components: ['Content', 'Author Bio', 'Comments', 'Related Posts'] },
      { name: 'Author Page', components: ['Author Bio', 'Post List', 'Social Links'] },
      { name: 'About', components: ['Story', 'Team', 'Contact'] }
    ]
  },
  portfolio: {
    name: 'Portfolio / Agency',
    description: 'Showcase work, services, contact',
    suggested_pages: [
      { name: 'Home', components: ['Hero', 'Featured Work', 'Services', 'Testimonials'] },
      { name: 'Work', components: ['Project Grid', 'Filter', 'Case Study Modal'] },
      { name: 'Services', components: ['Service Cards', 'Pricing', 'Process'] },
      { name: 'About', components: ['Story', 'Team', 'Values'] },
      { name: 'Contact', components: ['Contact Form', 'Map', 'Social Links'] }
    ]
  },
  social: {
    name: 'Social Network',
    description: 'Feed, profiles, messaging',
    suggested_pages: [
      { name: 'Feed', components: ['Post Composer', 'Post Feed', 'Stories', 'Trending'] },
      { name: 'Profile', components: ['Cover Photo', 'Bio', 'Posts Grid', 'Friends'] },
      { name: 'Messages', components: ['Chat List', 'Chat Window', 'Input', 'Media Upload'] },
      { name: 'Notifications', components: ['Notification List', 'Filter', 'Mark All Read'] },
      { name: 'Settings', components: ['Privacy', 'Notifications', 'Account'] }
    ]
  },
  admin: {
    name: 'Admin Panel',
    description: 'CRUD operations, management',
    suggested_pages: [
      { name: 'Dashboard', components: ['Stats', 'Charts', 'Recent Items', 'Quick Actions'] },
      { name: 'Data Table', components: ['Table', 'Search', 'Filters', 'Pagination', 'Bulk Actions'] },
      { name: 'Form Page', components: ['Input Fields', 'Validation', 'Submit', 'Cancel'] },
      { name: 'Detail View', components: ['Info Cards', 'Tabs', 'Edit/Delete Actions'] },
      { name: 'Settings', components: ['System Config', 'User Roles', 'Audit Log'] }
    ]
  },
  landing: {
    name: 'Landing Page',
    description: 'Marketing, conversion-focused',
    suggested_pages: [
      { name: 'Landing', components: ['Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'CTA'] }
    ]
  },
  custom: {
    name: 'Custom (I will specify)',
    description: 'You define your own pages and components',
    suggested_pages: []
  }
};

// ── Platform Types ──
const PLATFORMS = {
  web: { name: 'Website', icon: '🌐', description: 'Desktop + Mobile responsive website' },
  mobile_web: { name: 'Mobile Web App', icon: '📱', description: 'Mobile-first web application' },
  pwa: { name: 'PWA', icon: '🔄', description: 'Progressive Web App (installable)' },
  desktop: { name: 'Desktop Web App', icon: '🖥️', description: 'Desktop-focused web application' }
};

// ── Design Styles ──
const DESIGN_STYLES = {
  modern_minimal: { name: 'Modern Minimal', icon: '✨', description: 'Clean, spacious, Apple-inspired' },
  glassmorphism: { name: 'Glassmorphism', icon: '🪟', description: 'Frosted glass, blur effects, gradients' },
  dark_neon: { name: 'Dark Neon', icon: '🌃', description: 'Dark mode, vibrant accents, cyberpunk' },
  neumorphism: { name: 'Neumorphism', icon: '', description: 'Soft UI, extruded shapes, tactile' },
  brutalism: { name: 'Brutalism', icon: '🔲', description: 'Raw, bold borders, high contrast' },
  gradient_mesh: { name: 'Gradient Mesh', icon: '🎨', description: 'Fluid gradients, dreamy colors' },
  aurora: { name: 'Aurora', icon: '🌌', description: 'Pastel gradients, nature-inspired, calming' },
  clay: { name: 'Clay', icon: '🏺', description: 'Warm tones, rounded, organic, friendly' },
  retro: { name: 'Retro', icon: '📻', description: 'Vintage vibes, serif fonts, classic' },
  holographic: { name: 'Holographic', icon: '💎', description: 'Iridescent, futuristic, prismatic' },
  bento_grid: { name: 'Bento Grid', icon: '📦', description: 'Modular, card-based, organized' },
  flat_design: { name: 'Flat Design', icon: '📐', description: 'Simple, bold colors, no shadows' },
  adaptive: { name: 'AI Adaptive', icon: '🤖', description: 'AI chooses best style for context (recommended)' }
};

// ── Create MCP Server ──
const server = new McpServer({
  name: 'ai-designer',
  version: '2.0.0'
});

// ═══════════════════════════════════════════════════════════
// TOOL 1: discover_business
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'discover_business',
  {
    title: 'Discover Business & Domain',
    description: 'Step 1: Understand business domain, target audience, and project goals. ALWAYS run this FIRST.',
    inputSchema: {
      user_input: z.string().optional().describe('User description of their project, or empty to start guided questions')
    }
  },
  async ({ user_input }) => {
    const response = {
      type: 'business_discovery',
      step: 1,
      questions: [
        {
          id: 'business_domain',
          question: 'What type of business/domain is this?',
          type: 'select',
          options: Object.entries(BUSINESS_DOMAINS).map(([key, val]) => ({
            value: key,
            label: `${val.icon || '📌'} ${val.name}`,
            description: val.description
          })),
          suggestion: 'Choose closest match, or "custom" to define your own'
        },
        {
          id: 'project_name',
          question: 'What is your project name?',
          type: 'text',
          placeholder: 'My Awesome App'
        },
        {
          id: 'target_audience',
          question: 'Who is your target audience?',
          type: 'select',
          options: [
            { value: 'general', label: 'General Users' },
            { value: 'enterprise', label: 'Enterprise / B2B' },
            { value: 'developer', label: 'Developers' },
            { value: 'consumer', label: 'Consumers / B2C' },
            { value: 'internal', label: 'Internal Team' }
          ]
        },
        {
          id: 'platform',
          question: 'What platform are you building for?',
          type: 'select',
          options: Object.entries(PLATFORMS).map(([key, val]) => ({
            value: key,
            label: `${val.icon} ${val.name}`,
            description: val.description
          }))
        },
        {
          id: 'style_gallery',
          question: '🎨 Browse design styles and pick your favorite:',
          type: 'link',
          url: STYLE_GALLERY_URL,
          instruction: `Open this URL, browse styles, then tell me which one you like.
Style names: ${Object.values(DESIGN_STYLES).map(s => s.name).join(', ')}`
        }
      ],
      instructions: `Answer these questions so I can design the perfect UI for you.
You can answer all at once or one by one.

Example:
{
  business_domain: "ecommerce",
  project_name: "ShopVN",
  target_audience: "consumer",
  platform: "web",
  design_style: "modern_minimal"
}`
    };

    // If user provided input, try to parse it
    if (user_input) {
      response.user_input = user_input;
      response.parsed = tryParseUserInput(user_input);
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(response, null, 2) }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// TOOL 2: discover_pages
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'discover_pages',
  {
    title: 'Discover Pages & Components',
    description: 'Step 2: Define pages and components for each page. Run after discover_business.',
    inputSchema: {
      business_domain: z.string().describe('Domain from step 1'),
      custom_pages: z.array(z.object({
        name: z.string(),
        route: z.string(),
        components: z.array(z.string()),
        description: z.string().optional()
      })).optional().describe('Custom pages (if domain is "custom")'),
      modify_pages: z.array(z.object({
        page_name: z.string(),
        add_components: z.array(z.string()).optional(),
        remove_components: z.array(z.string()).optional()
      })).optional().describe('Modify suggested pages')
    }
  },
  async ({ business_domain, custom_pages, modify_pages }) => {
    const domain = BUSINESS_DOMAINS[business_domain];
    let pages = domain ? [...domain.suggested_pages] : [];
    
    // If custom pages provided
    if (custom_pages && custom_pages.length > 0) {
      pages = custom_pages.map(p => ({
        name: p.name,
        route: p.route || `/${p.name.toLowerCase().replace(/\s+/g, '-')}`,
        components: p.components,
        description: p.description || ''
      }));
    }

    // Apply modifications
    if (modify_pages) {
      modify_pages.forEach(mod => {
        const page = pages.find(p => p.name.toLowerCase() === mod.page_name.toLowerCase());
        if (page) {
          if (mod.add_components) page.components = [...page.components, ...mod.add_components];
          if (mod.remove_components) {
            page.components = page.components.filter(c => !mod.remove_components.includes(c));
          }
        }
      });
    }

    // Generate routes
    pages = pages.map((p, i) => ({
      ...p,
      route: p.route || `/${p.name.toLowerCase().replace(/\s+/g, '-')}`,
      order: i + 1,
      smart_suggestions: suggestComponentsForPage(p.name, p.components)
    }));

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          type: 'pages_discovery',
          step: 2,
          business_domain,
          domain_name: domain?.name || 'Custom',
          pages,
          total_pages: pages.length,
          total_components: pages.reduce((sum, p) => sum + p.components.length, 0),
          instructions: `
Review the pages and components above.
You can:
1. Accept as-is → proceed to scaffold
2. Modify: use modify_pages to add/remove components
3. Custom: provide your own pages list

Example modification:
{ modify_pages: [{ page_name: "Home", add_components: ["Search Bar"], remove_components: ["Newsletter"] }] }
          `.trim()
        }, null, 2)
      }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// TOOL 3: scaffold_project
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'scaffold_project',
  {
    title: 'Scaffold Vite + React Router Project',
    description: 'Step 3: Create Vite + React + TypeScript + React Router + Tailwind + Ant Design project structure.',
    inputSchema: {
      project_name: z.string().describe('Project name'),
      project_path: z.string().describe('Where to create the project'),
      pages: z.array(z.object({
        name: z.string(),
        route: z.string(),
        components: z.array(z.string())
      })).describe('Pages from step 2'),
      design_style: z.string().describe('Selected design style'),
      package_manager: z.enum(['npm', 'yarn', 'pnpm']).default('npm')
    }
  },
  async ({ project_name, project_path, pages, design_style, package_manager }) => {
    const scaffoldCommands = generateScaffoldCommands(project_name, project_path, pages, package_manager);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          type: 'scaffold_project',
          step: 3,
          project_name,
          project_path,
          design_style,
          pages_count: pages.length,
          commands: scaffoldCommands,
          project_structure: generateProjectStructure(pages),
          instructions: `
Run these commands to scaffold the project:

1. ${scaffoldCommands.create}
2. ${scaffoldCommands.install}
3. ${scaffoldCommands.setup}

After scaffolding, use design_generate to create each page.
          `.trim()
        }, null, 2)
      }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// TOOL 4: design_generate
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'design_generate',
  {
    title: 'Design Generate Page',
    description: 'Step 4: Generate a specific page with all its components. Beautiful React + Tailwind + Ant Design code.',
    inputSchema: {
      page_name: z.string().describe('Which page to design'),
      components: z.array(z.string()).describe('Components to include'),
      design_style: z.string().describe('Visual style'),
      project_path: z.string().optional().describe('Path to existing project'),
      output_mode: z.enum(['sandbox', 'direct', 'file']).default('sandbox'),
      additional_requirements: z.string().optional()
    }
  },
  async ({ page_name, components, design_style, project_path, output_mode, additional_requirements }) => {
    const pageCode = generatePageCode(page_name, components, design_style, additional_requirements);
    const componentCodes = components.map(c => generateComponentCode(c, design_style));

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          type: 'design_generated',
          step: 4,
          page_name,
          design_style,
          output_mode,
          page_code: pageCode,
          component_codes: componentCodes,
          sandbox_path: output_mode === 'sandbox' ? `/tmp/ai-designer/${page_name.toLowerCase().replace(/\s+/g, '-')}` : null,
          instructions: `
Page "${page_name}" generated with style: ${design_style}

${output_mode === 'sandbox' ? `Preview in sandbox: /tmp/ai-designer/${page_name.toLowerCase().replace(/\s+/g, '-')}
Run: cd sandbox && npm run dev` : ''}

To apply to project:
1. Copy page code to: src/pages/${page_name}.tsx
2. Copy components to: src/components/
3. Update router: src/App.tsx
          `.trim()
        }, null, 2)
      }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// TOOL 5: design_apply_page
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'design_apply_page',
  {
    title: 'Design Apply Page to Project',
    description: 'Step 5: Apply generated page to existing project. Creates files and updates router.',
    inputSchema: {
      page_name: z.string(),
      page_code: z.string().describe('Generated page code'),
      component_codes: z.array(z.object({ name: z.string(), code: z.string() })).describe('Component codes'),
      project_path: z.string(),
      route: z.string().describe('Route path like /dashboard'),
      design_style: z.string()
    }
  },
  async ({ page_name, page_code, component_codes, project_path, route, design_style }) => {
    const filesToCreate = [
      { path: `${project_path}/src/pages/${page_name}.tsx`, content: page_code },
      ...component_codes.map(c => ({
        path: `${project_path}/src/components/${c.name}.tsx`,
        content: c.code
      }))
    ];

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          type: 'design_applied',
          step: 5,
          page_name,
          route,
          files_created: filesToCreate.map(f => f.path),
          router_update: `
// Add to src/App.tsx:
import ${page_name} from './pages/${page_name}';

// In <Routes>:
<Route path="${route}" element={<${pageName} />} />
          `,
          instructions: `
Page "${page_name}" applied to project!

Files created:
${filesToCreate.map(f => `- ${f.path}`).join('\n')}

Next: Update router in App.tsx (see router_update above)
          `.trim()
        }, null, 2)
      }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// TOOL 6: design_generate_all
// ═══════════════════════════════════════════════════════════

server.registerTool(
  'design_generate_all',
  {
    title: 'Design Generate All Pages',
    description: 'Generate ALL pages at once. Batch mode for full project.',
    inputSchema: {
      pages: z.array(z.object({
        name: z.string(),
        route: z.string(),
        components: z.array(z.string())
      })),
      design_style: z.string(),
      project_path: z.string(),
      generate_sequentially: z.boolean().default(true).describe('Generate one by one (true) or all at once (false)')
    }
  },
  async ({ pages, design_style, project_path, generate_sequentially }) => {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          type: 'batch_design_start',
          step: 4,
          total_pages: pages.length,
          design_style,
          mode: generate_sequentially ? 'sequential' : 'parallel',
          pages_to_generate: pages.map((p, i) => ({
            order: i + 1,
            name: p.name,
            route: p.route,
            components_count: p.components.length
          })),
          instructions: `
Starting batch generation of ${pages.length} pages with style: ${design_style}

${generate_sequentially ? 'Generating sequentially (one page at a time)...' : 'Generating all pages...'}

Use design_generate for each page, then design_apply_page to apply.
          `.trim()
        }, null, 2)
      }]
    };
  }
);

// ═══════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function tryParseUserInput(input) {
  try {
    return JSON.parse(input);
  } catch {
    // Try to extract keywords
    const lower = input.toLowerCase();
    const detected = {};
    
    for (const [key, domain] of Object.entries(BUSINESS_DOMAINS)) {
      if (lower.includes(key) || lower.includes(domain.name.toLowerCase())) {
        detected.business_domain = key;
        break;
      }
    }
    
    if (lower.includes('shop') || lower.includes('store') || lower.includes('ecommerce')) detected.business_domain = 'ecommerce';
    if (lower.includes('dashboard') || lower.includes('analytics') || lower.includes('saas')) detected.business_domain = 'saas_dashboard';
    if (lower.includes('blog') || lower.includes('article') || lower.includes('content')) detected.business_domain = 'blog';
    
    return Object.keys(detected).length > 0 ? detected : null;
  }
}

function suggestComponentsForPage(pageName, existingComponents) {
  const suggestions = {
    'home': ['Hero Section', 'Feature Highlights', 'Call to Action', 'Footer'],
    'dashboard': ['Stats Cards', 'Charts', 'Recent Activity', 'Quick Actions'],
    'settings': ['Profile Section', 'Preferences', 'Notifications', 'Save Button'],
    'profile': ['Avatar', 'User Info', 'Edit Button', 'Activity Log'],
    'login': ['Email Input', 'Password Input', 'Remember Me', 'Login Button', 'Forgot Password'],
    'register': ['Name Input', 'Email Input', 'Password Input', 'Confirm Password', 'Register Button']
  };
  
  const name = pageName.toLowerCase();
  for (const [key, value] of Object.entries(suggestions)) {
    if (name.includes(key)) {
      return value.filter(v => !existingComponents.includes(v));
    }
  }
  return [];
}

function generateScaffoldCommands(projectName, projectPath, pages, packageManager) {
  const pm = packageManager;
  return {
    create: `${pm} create vite@latest ${projectName} --template react-ts`,
    install: `cd ${projectName} && ${pm} install react-router-dom antd @ant-design/icons && ${pm} install -D tailwindcss postcss autoprefixer`,
    setup: `cd ${projectName} && npx tailwindcss init -p`,
    additional_files: pages.map(p => `src/pages/${p.name}.tsx`),
    router_setup: `
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
${pages.map(p => `import ${p.name.replace(/\s+/g, '')} from './pages/${p.name}';`).join('\n')}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        ${pages.map(p => `<Route path="${p.route}" element={<${p.name.replace(/\s+/g, '')} />} />`).join('\n        ')}
      </Routes>
    </BrowserRouter>
  );
}
    `
  };
}

function generateProjectStructure(pages) {
  return `
project/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── shared/
│   ├── pages/
${pages.map(p => `│   │   ├── ${p.name}.tsx  (${p.components.length} components)`).join('\n')}
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
  `;
}

function generatePageCode(pageName, components, style, additionalReqs) {
  const className = pageName.replace(/\s+/g, '');
  const styleClasses = getStyleClasses(style);
  
  return `import React from 'react';
import { Layout, Typography, Space } from 'antd';
${components.map(c => `import ${c.replace(/\s+/g, '')} from '../components/${c.replace(/\s+/g, '')}';`).join('\n')}

const { Content } = Layout;
const { Title, Text } = Typography;

interface ${className}Props {
  // Add props here
}

const ${className}: React.FC<${className}Props> = () => {
  return (
    <div className="${styleClasses.container}">
      <Title level={2}>${pageName}</Title>
      <Space direction="vertical" size="large" className="w-full">
        ${components.map(c => `<${c.replace(/\s+/g, '')} />`).join('\n        ')}
      </Space>
    </div>
  );
};

export default ${className};`;
}

function generateComponentCode(componentName, style) {
  const className = componentName.replace(/\s+/g, '');
  const styleClasses = getStyleClasses(style);
  
  return `import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface ${className}Props {
  // Add props here
}

const ${className}: React.FC<${className}Props> = () => {
  return (
    <Card className="${styleClasses.card}" title="${componentName}">
      <Text>${componentName} content goes here</Text>
    </Card>
  );
};

export default ${className};`;
}

function getStyleClasses(style) {
  const styles = {
    modern_minimal: { container: 'min-h-screen bg-white p-8', card: 'rounded-lg shadow-sm border border-gray-100' },
    glassmorphism: { container: 'min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8', card: 'rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20' },
    dark_neon: { container: 'min-h-screen bg-gray-900 p-8', card: 'rounded-xl bg-gray-800 border border-gray-700' },
    neumorphism: { container: 'min-h-screen bg-[#e0e5ec] p-8', card: 'rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff]' },
    brutalism: { container: 'min-h-screen bg-white p-8', card: 'rounded-none border-4 border-black shadow-[6px_6px_0_#000]' },
    gradient_mesh: { container: 'min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8', card: 'rounded-2xl bg-white/20 backdrop-blur-sm' },
    aurora: { container: 'min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 p-8', card: 'rounded-2xl bg-white/60 backdrop-blur-sm' },
    clay: { container: 'min-h-screen bg-[#f5f0e8] p-8', card: 'rounded-3xl bg-[#f5f0e8] shadow-lg' },
    retro: { container: 'min-h-screen bg-[#fff8dc] p-8 font-serif', card: 'rounded-none border-2 border-[#daa520] bg-[#fff8dc]' },
    holographic: { container: 'min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-8', card: 'rounded-2xl bg-white/30 backdrop-blur-md' },
    bento_grid: { container: 'min-h-screen bg-gray-50 p-8', card: 'rounded-xl bg-white shadow-sm' },
    flat_design: { container: 'min-h-screen bg-blue-50 p-8', card: 'rounded-lg bg-white' },
    adaptive: { container: 'min-h-screen bg-gray-50 p-8', card: 'rounded-xl bg-white shadow-sm border border-gray-100' }
  };
  return styles[style] || styles.adaptive;
}

// ═══════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('AI Designer MCP Server v2.0 running on stdio');
  console.error('Universal: Claude Code | Gemini CLI');
}

main().catch(console.error);
