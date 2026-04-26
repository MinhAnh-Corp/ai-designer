# Skills Catalog — skillsmp.com (filtered)

Source: https://skillsmp.com (973k total skills, API capped at 1200/sort, search returns ~1000/keyword).

Curated via 60+ keyword searches, deduped by name (highest-stars version kept), filtered by relevance per role.

## Priority order (user spec)

1. **blockchain** — Solidity, Cosmos SDK, EVM, DeFi, smart contracts
2. **security** — OWASP, pentesting, audit, supply chain, secure coding
3. **devops** — Kubernetes, Docker, Terraform, CI/CD, observability
4. **backend** — NestJS, Go, Postgres, Redis, GraphQL
5. **frontend** — React, Next.js, Vue, Svelte, TypeScript
6. **designer** — Glassmorphism, Aurora, Gradient Mesh, Sci-fi, GSAP, Three.js
7. **pmba** — PRD, roadmap, agile, tokenomics, GTM

## Files

| File | Skills | Top by stars |
|------|--------|--------------|
| `curated-blockchain.json` | 20 | defi-amm-security (162k★), solidity-security (34k★), web3-testing (34k★) |
| `curated-security.json` | 20 | security-triage (361k★), security-review (162k★), pentest-checklist (34k★) |
| `curated-devops.json` | 20 | docker-patterns (162k★), docker-management (107k★), github-actions-templates (34k★) |
| `curated-backend.json` | 20 | golang-patterns (162k★), postgres-patterns (162k★), database-migrations (162k★) |
| `curated-frontend.json` | 20 | nextjs-turbopack (162k★), react-vendoring (139k★), antd-* (97k★), zustand (75k★) |
| `curated-designer.json` | 20 | design-system (162k★), liquid-glass-design (162k★), 3d-web-experience (34k★) |
| `curated-pmba.json` | 20 | prd (30k★), roadmap-management (19k★), product-manager-toolkit (12k★) |

## How to clone a skill

Each entry has `url` like `https://github.com/<owner>/<repo>/tree/<branch>/<skill-path>`.

**Option A: sparse-checkout (recommended — keep updates)**

```bash
cd ai-agents/ai-designer/skills
git clone --depth 1 --filter=blob:none --sparse https://github.com/<owner>/<repo>.git <skill-name>
cd <skill-name>
git sparse-checkout set <skill-path>
rm -rf .git  # if you don't need updates
```

**Option B: download single SKILL.md (lightest — no future updates)**

```bash
curl -L https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<skill-path>/SKILL.md \
  -o ai-agents/ai-designer/skills/<skill-name>.md
```

## How catalog was built

```bash
# Per-role keyword fanout (60+ queries total, parallel)
for kw in solidity cosmos-sdk evm defi foundry hardhat ...; do
  curl -s "https://skillsmp.com/api/skills?search=$kw&limit=100&sortBy=stars" \
    -o "/tmp/skillsmp/roles/blockchain__$kw.json" &
done
wait

# Dedupe by name, top-20 per role
jq -s '
  [.[].skills[]?] | group_by(.name) | map(max_by(.stars)) |
  sort_by(-.stars) | .[0:20]
' blockchain__*.json > curated-blockchain.json
```

## Refresh cadence

- API listing capped → re-run keyword fanout monthly to discover new skills
- Use `sortBy=recent` for fresh additions
