# Pydantic AI Patterns - Knowledge Base

## Core Concepts

### Agent Definition
```python
from pydantic_ai import Agent

agent = Agent(
    'openai:gpt-4o',           # Model specification
    deps_type=MyDeps,           # Dependency injection type
    output_type=MyOutput,       # Structured output type
    instructions='...',         # System prompt
)
```

### Dependency Injection
```python
from dataclasses import dataclass

@dataclass
class MyDeps:
    db: DatabaseConn
    http_client: httpx.AsyncClient
    api_key: str
```

### Structured Output
```python
from pydantic import BaseModel, Field

class MyOutput(BaseModel):
    result: str = Field(description='Main result')
    confidence: float = Field(ge=0, le=1)
    metadata: dict = Field(default_factory=dict)
```

### Tools
```python
@agent.tool
async def my_tool(ctx: RunContext[MyDeps], param: str) -> str:
    """Tool description for LLM."""
    return await ctx.deps.db.query(param)
```

### Dynamic Instructions
```python
@agent.instructions
async def add_context(ctx: RunContext[MyDeps]) -> str:
    data = await ctx.deps.db.get_context()
    return f"Context: {data}"
```

### Error Handling
```python
from pydantic_ai import ModelRetry

@agent.tool
async def risky_tool(ctx: RunContext[MyDeps], param: str) -> str:
    try:
        return await do_something(param)
    except ValueError as e:
        raise ModelRetry(f"Invalid input: {e}")
```

## Testing Patterns

### Block Real Requests
```python
from pydantic_ai import models
models.ALLOW_MODEL_REQUESTS = False
```

### TestModel Override
```python
from pydantic_ai.models.test import TestModel

with agent.override(model=TestModel()):
    result = await agent.run("query", deps=deps)
```

### Capture Messages
```python
from pydantic_ai import capture_run_messages

with capture_run_messages() as messages:
    with agent.override(model=TestModel()):
        await agent.run("query", deps=deps)
# Inspect messages for assertions
```

## Multi-Agent Patterns

### Agent Delegation
```python
@parent_agent.tool
async def delegate(ctx: RunContext[Deps], query: str) -> str:
    result = await child_agent.run(
        query,
        deps=ctx.deps,
        usage=ctx.usage,  # Share usage tracking
    )
    return result.output
```

### Usage Limits
```python
from pydantic_ai import UsageLimits

result = await agent.run(
    "query",
    deps=deps,
    usage_limits=UsageLimits(
        request_limit=10,
        total_tokens_limit=5000,
    ),
)
```

## Best Practices

1. **Always define output_type** - Guarantees response shape
2. **Use dataclass for deps** - Type-safe dependency injection
3. **3-7 tools per agent** - Keep agents focused
4. **Verbose docstrings** - LLM uses them for tool selection
5. **ModelRetry for recoverable errors** - LLM can adjust and retry
6. **Block real requests in tests** - Prevent accidental API charges
7. **Async first** - Use async/await for all I/O
