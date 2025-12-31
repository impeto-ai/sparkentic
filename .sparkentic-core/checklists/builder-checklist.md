# Builder Checklist

## Before Starting
- [ ] Read docs/agent-design.md thoroughly
- [ ] Understand all dependencies needed
- [ ] Understand output schema
- [ ] Understand each tool's purpose

## Dependencies (src/deps.py)
- [ ] Create dataclass with all deps
- [ ] Add type hints
- [ ] Add docstring explaining each field
- [ ] Consider optional deps (default values)

## Schemas (src/schemas.py)
- [ ] Implement output Pydantic model
- [ ] Add Field descriptions
- [ ] Add validators as needed
- [ ] Consider input schemas if needed

## Tools (src/tools/*.py)
- [ ] One file per tool (or group related)
- [ ] Async functions (async def)
- [ ] Type hints on all parameters
- [ ] Detailed docstrings
- [ ] Use ctx.deps for dependencies
- [ ] Return strings (LLM-friendly)
- [ ] ModelRetry for recoverable errors
- [ ] Don't expose internal errors

## Agent (src/agent.py)
- [ ] Create Agent with correct types
- [ ] Set deps_type
- [ ] Set output_type
- [ ] Write clear instructions
- [ ] Add dynamic instructions if needed
- [ ] Register all tools

## Code Quality
- [ ] Verbose comments explaining "why"
- [ ] Descriptive variable names
- [ ] Type hints everywhere
- [ ] async/await for all I/O
- [ ] No hardcoded secrets
- [ ] Proper imports

## Output
- [ ] src/deps.py complete
- [ ] src/schemas.py complete
- [ ] src/tools/*.py complete
- [ ] src/agent.py complete
- [ ] Ready for Tester phase
