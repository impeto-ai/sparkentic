#!/usr/bin/env node

/**
 * Post-install script for SPARKENTIC
 *
 * Shows the banner and quick start instructions after npm install
 */

console.log(`
    ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
    ███████╗██████╔╝███████║██████╔╝█████╔╝ ███████╗███╗   ██╗████████╗██╗ ██████╗
    ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗ ██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝
    ███████║██║     ██║  ██║██║  ██║██║  ██╗███████╗██║ ╚████║   ██║   ██║╚██████╗
    ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝
                    Production AI Agents | Pydantic AI

  SPARKENTIC installed!

  Quick Start:
  1. cd your-project
  2. npx sparkentic init
  3. Use /sparkentic in Claude Code

  Workflow: Architect → Builder → Tester → Deployer

  Docs: https://github.com/joaodnascimento/sparkentic
`);
