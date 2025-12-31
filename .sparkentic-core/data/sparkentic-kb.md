# SPARKENTIC Knowledge Base

## What is SPARKENTIC?

SPARKENTIC (Structured Production Agent Rapid Kit - ENhanced Testing & Intelligent Code) is a methodology for building production-ready AI agents using Pydantic AI.

## Key Differentiators from SPARK

| Feature | SPARK | SPARKENTIC |
|---------|-------|------------|
| Language | TypeScript | Python |
| Framework | LangGraph | Pydantic AI |
| Typing | Zod | Pydantic |
| Testing | Manual | TestModel + pytest |
| DI | Manual | RunContext |
| Output | JSON | Structured Models |
| Workflow | 3 phases | 4 phases (includes Testing) |

## Workflow Phases

### Phase 1: Design (Architect - Nova)
- Define agent purpose
- Design output schema (Pydantic model)
- Plan dependencies (dataclass)
- Design tools (3-7 focused)
- Output: docs/agent-design.md

### Phase 2: Build (Builder - Atlas)
- Implement deps.py
- Implement schemas.py
- Implement tools/*.py
- Create agent.py
- Output: src/ directory

### Phase 3: Test (Tester - Sentinel) - NEW!
- Create conftest.py with fixtures
- Write tool unit tests
- Write agent integration tests
- Test error scenarios
- Output: tests/ directory

### Phase 4: Deploy (Deployer - Stratus)
- Verify tests pass
- Create Dockerfile
- Setup environment
- Deploy with health checks
- Output: Live service

## Pydantic AI Core Concepts

### Agent
The main interface for LLM interactions. Generic in deps and output types.

### RunContext
Carries dependencies into tools and instructions. Type-safe access via ctx.deps.

### Structured Output
Pydantic models as output_type guarantee response shape. Validation errors trigger retry.

### TestModel
Mock model for testing. Returns predictable responses without API calls.

## Commands Reference

### Orchestrator Commands
- `*help` - Show commands
- `*agent {name}` - Switch agent
- `*workflow` - Show diagram
- `*new-agent` - Start project

### Agent Commands
- `*design` - Create design
- `*implement` - Write code
- `*test-all` - Write tests
- `*deploy` - Deploy service
- `*done` - Next phase
- `*back` - Return to orchestrator
