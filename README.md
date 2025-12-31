# SPARKENTIC

```
    ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗████████╗██╗ ██████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝
    ███████╗██████╔╝███████║██████╔╝█████╔╝ █████╗  ██╔██╗ ██║   ██║   ██║██║
    ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗ ██╔══╝  ██║╚██╗██║   ██║   ██║██║
    ███████║██║     ██║  ██║██║  ██║██║  ██╗███████╗██║ ╚████║   ██║   ██║╚██████╗
    ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝
    ════════════════════════════════════════════════════════════════════════════
    Production-Ready AI Agents | Pydantic AI | Test-Driven
```

**SPARKENTIC** (Structured Production Agent Rapid Kit - ENhanced Testing & Intelligent Code) is a methodology for building **production-ready AI agents** using **Pydantic AI**.

Built for Claude Code. Test-driven. Python-native.

## Quick Start

```bash
# Install
npm install -g sparkentic

# Initialize in your project
cd my-agent-project
npx sparkentic init

# Start Claude Code and use
/sparkentic
```

## Philosophy

### Type-Safe First

Pydantic AI brings the FastAPI feeling to GenAI:

1. **Structured Output** - Pydantic models guarantee response shape
2. **Dependency Injection** - Type-safe deps via RunContext
3. **Tools with Schemas** - Automatic validation and retry
4. **IDE Support** - Full autocomplete and type checking

### Test-Driven Agents

Every agent is tested before deployment:

- **TestModel** for mocking LLM responses
- **capture_run_messages** for assertion
- **pytest** integration built-in
- **No real API calls** during testing

### Production First

Every decision considers production deployment:

- Error handling with ModelRetry
- Dependency injection for services
- Structured outputs for reliability
- Usage tracking and limits

## Workflow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   ARCHITECT  │ ──► │   BUILDER    │ ──► │   TESTER     │ ──► │   DEPLOYER   │
│              │     │              │     │              │     │              │
│ Design agent │     │ Implement    │     │ Write tests  │     │ Deploy to    │
│ tools, deps  │     │ Python code  │     │ with pytest  │     │ production   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Phase 1: Design (Architect)

- Define agent purpose & output schema
- Design tools (3-7 focused tools)
- Define dependencies (dataclass)
- Output: `docs/agent-design.md`

### Phase 2: Build (Builder)

- Implement tools with @agent.tool
- Create Agent with deps_type, output_type
- Add dynamic instructions
- Output: `src/` directory

### Phase 3: Test (Tester) - NEW!

- Write pytest tests with TestModel
- Mock dependencies and responses
- Validate tool calls and outputs
- Output: `tests/` directory

### Phase 4: Deploy (Deployer)

- Configure deployment (Docker/Railway)
- Setup environment variables
- Deploy with health checks
- Output: Live service

## Commands

All commands use `/` prefix in Claude Code:

| Command | Description |
|---------|-------------|
| `/sparkentic` | Start orchestrator |
| `/spk-architect` | Design agent |
| `/spk-builder` | Implement code |
| `/spk-tester` | Write tests |
| `/spk-deployer` | Deploy to production |

Within agents, use `*` prefix:

| Command | Description |
|---------|-------------|
| `*help` | Show available commands |
| `*agent {name}` | Switch to specialist |
| `*workflow` | Show workflow diagram |

## Project Structure

After initialization:

```
your-project/
├── .sparkentic-core/      # SPARKENTIC files
│   ├── agents/            # Agent definitions
│   ├── templates/         # Document templates
│   ├── tasks/             # Executable tasks
│   ├── checklists/        # Validation checklists
│   ├── data/              # Knowledge base
│   └── workflows/         # Workflow definitions
├── .claude/
│   └── commands/
│       └── sparkentic/    # Claude Code commands
├── docs/
│   └── agent-design.md    # Your agent design
├── src/
│   ├── tools/             # Tool implementations
│   ├── deps.py            # Dependencies
│   ├── schemas.py         # Pydantic models
│   └── agent.py           # Agent definition
├── tests/
│   ├── conftest.py        # Pytest fixtures
│   └── test_agent.py      # Agent tests
└── pyproject.toml         # Python config
```

## Example: Support Agent

```python
from dataclasses import dataclass
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext


# 1. Define dependencies (type-safe DI)
@dataclass
class SupportDeps:
    customer_id: int
    db: DatabaseConn


# 2. Define structured output
class SupportOutput(BaseModel):
    advice: str = Field(description='Advice for the customer')
    risk: int = Field(description='Risk level 0-10', ge=0, le=10)
    escalate: bool = Field(description='Whether to escalate')


# 3. Create agent with types
support_agent = Agent(
    'openai:gpt-4o',
    deps_type=SupportDeps,
    output_type=SupportOutput,
    instructions='You are a support agent. Assess risk and provide advice.',
)


# 4. Add dynamic instructions
@support_agent.instructions
async def add_context(ctx: RunContext[SupportDeps]) -> str:
    name = await ctx.deps.db.get_customer_name(ctx.deps.customer_id)
    return f"Customer name: {name}"


# 5. Define tools
@support_agent.tool
async def get_balance(ctx: RunContext[SupportDeps]) -> str:
    """Get customer's current balance."""
    balance = await ctx.deps.db.get_balance(ctx.deps.customer_id)
    return f"${balance:.2f}"


# 6. Run with deps
async def main():
    deps = SupportDeps(customer_id=123, db=DatabaseConn())
    result = await support_agent.run("What's my balance?", deps=deps)
    print(result.output)  # SupportOutput guaranteed!
```

## Testing Example

```python
import pytest
from pydantic_ai.models.test import TestModel
from pydantic_ai import models

models.ALLOW_MODEL_REQUESTS = False  # Block real API calls

@pytest.fixture
def mock_deps():
    return SupportDeps(customer_id=123, db=MockDatabase())


async def test_support_agent(mock_deps):
    with support_agent.override(model=TestModel()):
        result = await support_agent.run(
            "What's my balance?",
            deps=mock_deps
        )

        assert result.output.risk >= 0
        assert result.output.risk <= 10
        assert isinstance(result.output.advice, str)
```

## Key Differences from SPARK

| Feature | SPARK | SPARKENTIC |
|---------|-------|------------|
| Language | TypeScript | Python |
| Framework | LangGraph | Pydantic AI |
| Typing | Zod | Pydantic |
| Testing | - | TestModel + pytest |
| DI | - | RunContext |
| Output | JSON | Structured Models |

## License

MIT

## Credits

Based on [SPARK Method](https://github.com/joaodnascimento/spark-method) - LangGraph TypeScript agents.

Built for the Pydantic AI ecosystem by [@joaodnascimento](https://github.com/joaodnascimento).
