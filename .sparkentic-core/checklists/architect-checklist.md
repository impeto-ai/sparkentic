# Architect Checklist

## Before Starting
- [ ] Understand the agent's purpose (one sentence)
- [ ] Identify the users/consumers of the agent
- [ ] List external services needed (APIs, databases)

## Output Schema Design
- [ ] Define Pydantic model for structured output
- [ ] Add Field descriptions for each field
- [ ] Use appropriate validators (ge, le, pattern, etc.)
- [ ] Consider optional vs required fields
- [ ] Document what each field represents

## Dependencies Design
- [ ] Create dataclass for dependencies
- [ ] Include database connections if needed
- [ ] Include HTTP client for external APIs
- [ ] Include API keys/credentials
- [ ] Document each dependency's purpose

## Tools Design
- [ ] 3-7 focused tools (not too many)
- [ ] Each tool does ONE thing well
- [ ] Clear, descriptive names
- [ ] Detailed docstrings (LLM reads these!)
- [ ] Consider which deps each tool needs
- [ ] Plan error handling (ModelRetry cases)

## Instructions
- [ ] Write clear system prompt
- [ ] Consider dynamic instructions needs
- [ ] Define agent personality/style
- [ ] Include any constraints

## Testing Strategy
- [ ] Identify deps to mock
- [ ] Plan tool test scenarios
- [ ] Plan agent test scenarios
- [ ] Consider edge cases

## Output
- [ ] docs/agent-design.md complete
- [ ] Ready for Builder phase
