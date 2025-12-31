#!/usr/bin/env node

/**
 * SPARKENTIC CLI
 *
 * This CLI helps initialize SPARKENTIC in your project.
 * It copies the .sparkentic-core and .claude/commands to your project.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for gradient effect (purple → cyan)
const colors = {
  purple: '\x1b[38;5;135m',
  magenta: '\x1b[38;5;201m',
  pink: '\x1b[38;5;213m',
  cyan: '\x1b[38;5;51m',
  blue: '\x1b[38;5;39m',
  teal: '\x1b[38;5;44m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[38;5;46m',
  yellow: '\x1b[38;5;226m',
};

const SPARKENTIC_BANNER = `
${colors.purple}${colors.bold}
    ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗████████╗██╗ ██████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝
${colors.magenta}    ███████╗██████╔╝███████║██████╔╝█████╔╝ █████╗  ██╔██╗ ██║   ██║   ██║██║
${colors.pink}    ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗ ██╔══╝  ██║╚██╗██║   ██║   ██║██║
${colors.cyan}    ███████║██║     ██║  ██║██║  ██║██║  ██╗███████╗██║ ╚████║   ██║   ██║╚██████╗
${colors.blue}    ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝
${colors.teal}    ════════════════════════════════════════════════════════════════════════════
${colors.reset}
${colors.dim}    Production-Ready AI Agents | Pydantic AI | Test-Driven${colors.reset}
${colors.dim}    v1.0.0 | 2025${colors.reset}
`;

console.log(SPARKENTIC_BANNER);

const command = process.argv[2];

if (!command || command === 'help') {
  console.log(`
${colors.bold}Usage:${colors.reset} sparkentic <command>

${colors.bold}Commands:${colors.reset}
  ${colors.cyan}init${colors.reset}      Initialize SPARKENTIC in current project
  ${colors.cyan}help${colors.reset}      Show this help message

${colors.bold}Aliases:${colors.reset}
  ${colors.dim}spk${colors.reset}       Short alias for sparkentic

${colors.bold}Example:${colors.reset}
  cd my-project
  npx sparkentic init
`);
  process.exit(0);
}

if (command === 'init') {
  const targetDir = process.cwd();
  const sourceDir = path.join(__dirname, '..');

  console.log(`${colors.yellow}Initializing SPARKENTIC...${colors.reset}\n`);

  // Copy .sparkentic-core
  const sparkenticCoreSource = path.join(sourceDir, '.sparkentic-core');
  const sparkenticCoreTarget = path.join(targetDir, '.sparkentic-core');

  if (fs.existsSync(sparkenticCoreSource)) {
    copyRecursive(sparkenticCoreSource, sparkenticCoreTarget);
    console.log(`${colors.green}✓${colors.reset} Created .sparkentic-core/`);
  }

  // Copy .claude/commands
  const claudeSource = path.join(sourceDir, '.claude');
  const claudeTarget = path.join(targetDir, '.claude');

  if (fs.existsSync(claudeSource)) {
    copyRecursive(claudeSource, claudeTarget);
    console.log(`${colors.green}✓${colors.reset} Created .claude/commands/sparkentic/`);
  }

  // Create project structure
  const dirs = ['docs', 'src', 'src/tools', 'tests'];
  dirs.forEach(dir => {
    const dirPath = path.join(targetDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`${colors.green}✓${colors.reset} Created ${dir}/`);
    }
  });

  // Create pyproject.toml if not exists
  const pyprojectPath = path.join(targetDir, 'pyproject.toml');
  if (!fs.existsSync(pyprojectPath)) {
    fs.writeFileSync(pyprojectPath, getPyprojectContent());
    console.log(`${colors.green}✓${colors.reset} Created pyproject.toml`);
  }

  console.log(`
${colors.bold}${colors.purple}SPARKENTIC initialized!${colors.reset}

${colors.bold}Next steps:${colors.reset}
${colors.dim}1.${colors.reset} Install Python dependencies:
   ${colors.cyan}poetry install${colors.reset} or ${colors.cyan}pip install pydantic-ai pytest${colors.reset}

${colors.dim}2.${colors.reset} Run Claude Code in this directory

${colors.dim}3.${colors.reset} Use ${colors.cyan}/sparkentic${colors.reset} to start the orchestrator

${colors.dim}4.${colors.reset} Or use specific agents:
   ${colors.purple}/spk-architect${colors.reset}  → design agent
   ${colors.magenta}/spk-builder${colors.reset}    → implement code
   ${colors.pink}/spk-tester${colors.reset}     → write tests
   ${colors.cyan}/spk-deployer${colors.reset}   → deploy to production

${colors.teal}Happy building!${colors.reset}
`);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getPyprojectContent() {
  return `[tool.poetry]
name = "my-agent"
version = "0.1.0"
description = "AI Agent built with SPARKENTIC + Pydantic AI"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
pydantic-ai = "^0.0.49"
httpx = "^0.27.0"
python-dotenv = "^1.0.0"

[tool.poetry.group.dev.dependencies]
pytest = "^8.0.0"
pytest-asyncio = "^0.23.0"
pytest-cov = "^4.1.0"

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
`;
}
