# BR Data Hub — Global B2B, Hiring Intent, Polymarket & Cyber Intelligence MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-10b981)](https://modelcontextprotocol.io)
[![Apify Store](https://img.shields.io/badge/Apify_Store-brdatahub-blue)](https://apify.com/brdatahub)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Official **Model Context Protocol (MCP)** server + ready-to-import **n8n automation workflows** connecting **Claude Desktop, Cursor, Windsurf, Cline, and n8n** to live structured B2B, financial, prediction-market, and cybersecurity intelligence powered by [BR Data Hub on Apify](https://apify.com/brdatahub).

---

## Included MCP Tools (6 Live Data Engines)

| Tool Name | What It Extracts | Ideal For |
|---|---|---|
| `enrich_b2b_website_contacts_and_tech` | Business emails, direct WhatsApp (`wa.me`) numbers, social links, Tax IDs & Shopify/VTEX/WooCommerce/HubSpot/Pixel stack | Outbound SDRs, Lead Generation Agents |
| `scan_ats_b2b_hiring_signals` | Live open roles across **Greenhouse, Ashby & Lever** classified by B2B department buying intent | RevOps, Account-Based Marketing |
| `scan_polymarket_odds_and_arbitrage` | Real-time **Polymarket** probabilities, 24h USD volume, liquidity & sum-of-outcomes mispricing alerts | Quant Research & AI Trading Agents |
| `search_global_google_news_sentiment` | Multi-country Google News (`US`, `GB`, `BR`, `ES`, `JP`, `DE`, `MX`) with publisher & headline sentiment | PR Monitoring, Market Intelligence |
| `check_cisa_epss_active_cyber_exploits` | Actively exploited US **CISA KEV** vulnerabilities cross-enriched with **FIRST.org EPSS** 30-day probability & ransomware flags | SecOps & Vulnerability Triage |
| `investigate_brazil_company_kyb_and_lawsuits` | 360° Brazilian KYB dossier crossing `.br` RDAP domain age, Receita Federal CNPJ/partners & CNJ court notices | Fintech Onboarding, Vendor KYB |

---

## Quick Setup (Claude Desktop / Cursor / Windsurf)

1. Grab your free API token at [Apify Integrations](https://console.apify.com/settings/integrations).
2. Add to `claude_desktop_config.json` or `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "brdatahub-intelligence": {
      "command": "npx",
      "args": ["-y", "github:brdatahub/global-intelligence-mcp"],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_API_TOKEN"
      }
    }
  }
}
```

---

## Ready-to-Import n8n Templates (`/n8n_templates`)

Import any JSON workflow directly into **n8n** (`Workflows -> Import from File`):
- [`n8n-01-b2b-website-whatsapp-tech-enricher.json`](./n8n_templates/n8n-01-b2b-website-whatsapp-tech-enricher.json)
- [`n8n-02-ats-hiring-signals-outbound-bot.json`](./n8n_templates/n8n-02-ats-hiring-signals-outbound-bot.json)
- [`n8n-03-polymarket-arbitrage-whale-monitor.json`](./n8n_templates/n8n-03-polymarket-arbitrage-whale-monitor.json)

---

## Full Catalog (35+ Structured Data Actors)

Explore all live B2B, sovereign macro (Japan MOF JGB, Hong Kong HKMA HIBOR, Spain Red Eléctrica PVPC, Colombia Superfinanciera TRM, Brazil BCB/CEPEA/ANEEL/PNCP) and arbitrage APIs at **[https://apify.com/brdatahub](https://apify.com/brdatahub)**.
