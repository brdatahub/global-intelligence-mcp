#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN || "";

const TOOLS = [
  {
    name: "enrich_b2b_website_contacts_and_tech",
    actor: "brdatahub~global-website-whatsapp-b2b-enricher",
    description: "Extract business emails, direct WhatsApp numbers, social links, Tax IDs & Shopify/VTEX/WooCommerce/HubSpot tech stack from company URLs.",
    inputSchema: {
      type: "object",
      properties: { urls: { type: "array", items: { type: "string" }, description: "Website URLs to enrich" } },
      required: ["urls"]
    }
  },
  {
    name: "scan_ats_b2b_hiring_signals",
    actor: "brdatahub~global-ats-b2b-hiring-signals",
    description: "Fetch live job postings across Greenhouse, Ashby & Lever classified by B2B department buying intent (AI/Data, Security, RevOps, Cloud).",
    inputSchema: {
      type: "object",
      properties: {
        greenhouseBoards: { type: "array", items: { type: "string" } },
        ashbyBoards: { type: "array", items: { type: "string" } },
        keywordFilter: { type: "string" },
        maxJobs: { type: "integer", default: 30 }
      }
    }
  },
  {
    name: "scan_polymarket_odds_and_arbitrage",
    actor: "brdatahub~global-polymarket-odds-arbitrage",
    description: "Get live Polymarket prediction probabilities, 24h USD volume, liquidity and multi-outcome mispricing signals.",
    inputSchema: {
      type: "object",
      properties: {
        keywordFilter: { type: "string" },
        minVolume24hUsd: { type: "number", default: 5000 },
        maxEvents: { type: "integer", default: 20 }
      }
    }
  },
  {
    name: "search_global_google_news_sentiment",
    actor: "brdatahub~global-google-news-multi-country-api",
    description: "Search live Google News across US, UK, BR, ES, JP, DE, MX with publisher attribution and headline sentiment.",
    inputSchema: {
      type: "object",
      properties: {
        queries: { type: "array", items: { type: "string" } },
        countryEdition: { type: "string", enum: ["US", "GB", "BR", "ES", "JP", "DE", "MX"], default: "US" },
        timeWindow: { type: "string", default: "7d" }
      },
      required: ["queries"]
    }
  },
  {
    name: "check_cisa_epss_active_cyber_exploits",
    actor: "brdatahub~global-cisa-kev-epss-cyber-exploits",
    description: "Fetch actively exploited CVEs from US CISA KEV enriched with FIRST.org 30-day EPSS probability & ransomware flags.",
    inputSchema: {
      type: "object",
      properties: { vendorFilter: { type: "string" }, onlyRansomware: { type: "boolean", default: false } }
    }
  },
  {
    name: "investigate_brazil_company_kyb_and_lawsuits",
    actor: "brdatahub~brazil-company-kyb-lawsuit-risk",
    description: "360-degree Brazilian KYB due diligence crossing .br domain age, Receita Federal CNPJ/partners and CNJ court notices.",
    inputSchema: {
      type: "object",
      properties: { targets: { type: "array", items: { type: "string" } } },
      required: ["targets"]
    }
  }
];

const server = new Server({ name: "brdatahub-global-intelligence", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }))
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = TOOLS.find((t) => t.name === req.params.name);
  if (!tool) throw new Error(`Unknown tool: ${req.params.name}`);
  if (!APIFY_TOKEN) throw new Error("Set APIFY_TOKEN environment variable (free at https://console.apify.com/settings/integrations).");

  const url = `https://api.apify.com/v2/acts/${tool.actor}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.params.arguments || {})
  });
  const data = await resp.json();
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
