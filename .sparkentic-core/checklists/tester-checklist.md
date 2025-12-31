# Tester Checklist

## Before Starting
- [ ] Read all source code in src/
- [ ] Understand dependencies
- [ ] Understand output schema
- [ ] Understand each tool

## Configuration
- [ ] ALLOW_MODEL_REQUESTS = False in conftest.py
- [ ] pytest-asyncio configured
- [ ] pytestmark = pytest.mark.anyio

## Fixtures (tests/conftest.py)
- [ ] Mock for each dependency
- [ ] mock_db fixture
- [ ] mock_http_client fixture
- [ ] Combined mock_deps fixture
- [ ] Sample input fixtures

## Tool Tests (tests/test_tools.py)
- [ ] Test each tool individually
- [ ] Test happy path
- [ ] Test invalid inputs
- [ ] Test ModelRetry scenarios
- [ ] Test dependency usage
- [ ] Use mock RunContext

## Agent Tests (tests/test_agent.py)
- [ ] TestModel override
- [ ] Test returns structured output
- [ ] Test output schema validation
- [ ] Test with mocked deps
- [ ] Test usage limits
- [ ] capture_run_messages if needed

## Error Tests
- [ ] Test ModelRetry behavior
- [ ] Test invalid output handling
- [ ] Test dependency failures
- [ ] Test edge cases

## Coverage
- [ ] Run with pytest-cov
- [ ] Aim for >80% coverage
- [ ] Cover critical paths

## Output
- [ ] tests/conftest.py complete
- [ ] tests/test_tools.py complete
- [ ] tests/test_agent.py complete
- [ ] All tests passing
- [ ] Ready for Deployer phase
