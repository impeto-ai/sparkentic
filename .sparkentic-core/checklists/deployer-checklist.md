# Deployer Checklist

## Before Starting
- [ ] ALL TESTS PASSING (pytest)
- [ ] No secrets in source code
- [ ] Dependencies documented

## Environment
- [ ] Create .env.example
- [ ] Document all env vars
- [ ] Set up .gitignore for .env
- [ ] API keys in env vars only

## Dockerfile
- [ ] Multi-stage build
- [ ] Non-root user
- [ ] Minimal image size
- [ ] Health check configured
- [ ] Port exposed

## Server (src/server.py)
- [ ] FastAPI app created
- [ ] Lifespan context manager
- [ ] /health endpoint
- [ ] /agent endpoint
- [ ] Proper error handling
- [ ] Logging configured
- [ ] Graceful shutdown

## Docker Compose (optional)
- [ ] Environment variables
- [ ] Health check
- [ ] Restart policy
- [ ] Logging configuration
- [ ] Volume mounts if needed

## Pre-Deploy Verification
- [ ] Docker image builds
- [ ] Container starts
- [ ] Health check returns 200
- [ ] Agent responds correctly

## Deploy
- [ ] Push to registry (if needed)
- [ ] Deploy to platform
- [ ] Verify health check
- [ ] Test with real request

## Post-Deploy
- [ ] Monitor error rates
- [ ] Check resource usage
- [ ] Verify logging works
- [ ] Document deployment

## Output
- [ ] Dockerfile complete
- [ ] docker-compose.yml (optional)
- [ ] .env.example complete
- [ ] src/server.py complete
- [ ] Service deployed and healthy
