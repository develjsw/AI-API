# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
- `pnpm install` - Install dependencies
- `pnpm start:dev` - Run development server (port 1234)
- `pnpm start:prod` - Run production server
- `pnpm build` - Build the project

### Code Quality
- `pnpm lint` - Lint and fix TypeScript files
- `pnpm format` - Format code with Prettier

### Testing
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:debug` - Run tests in debug mode

## Architecture Overview

This is a **NestJS AI API** demonstrating **Domain-Driven Design (DDD)** implementation alongside legacy architecture patterns. The project integrates multiple AI providers (OpenAI and Google AI) and serves as an experimental platform for AI tool utilization in real workflows.

### Core Structure

**Main Application:**
- Entry point at `src/main.ts` (port 1234)
- Global validation pipes with transformation enabled
- Environment-based configuration (development, production, local)

**DDD Implementation (`src/ai/`):**
- **Domain Layer** (`/domain/`): Entities, value objects, repository interfaces
- **Application Layer** (`/application/use-cases/`): Business logic use cases
- **Infrastructure Layer** (`/infrastructure/providers/`): External service implementations  
- **Presentation Layer** (`/presentation/`): Controllers and DTOs

**Legacy Modules:**
- `src/open-ai/` and `src/google-ai/` - Traditional service-controller pattern for comparison

### Key Patterns

**Dependency Injection:**
- Token-based injection for repositories (`'GoogleAiRepository'`, `'OpenAiRepository'`)
- Clean interface/implementation separation

**Environment Variables Required:**
- `GOOGLE_AI_API_KEY` - Google AI API access
- `OPEN_AI_API_KEY` - OpenAI API access  
- `OPEN_AI_API_HOST` - OpenAI API endpoint

**Validation Constraints:**
- Questions: 1-1000 characters
- Content generation: 1-2000 characters
- Text summarization: 1-5000 characters

**Error Handling:**
- Korean language error messages for user-facing responses
- Structured error responses with InternalServerErrorException

### AI Provider Integration

**Google AI (Gemini):**
- Uses `@google/genai` SDK
- Supports multiple Gemini models (2.5 Pro, 2.5 Flash, 2.0 Flash)
- Content generation through structured requests

**OpenAI:**
- Dual approach: HTTP API calls and `@openai/agents` SDK
- Agent-based configuration with role/tone instructions
- Supports GPT-3.5-turbo and GPT-4 models

## Development Guidelines

**Architecture Preference:**
- Use DDD structure in `src/ai/` for new features
- Follow established layering: Domain → Application → Infrastructure → Presentation

**Code Conventions:**
- Maintain Korean error messages for consistency
- Respect existing DTO validation patterns
- Use dependency injection with interface abstractions

**Project Philosophy:**
- Experimental platform for AI tool integration
- Balance between AI assistance and human judgment
- Focus on practical workflow enhancement over theoretical implementation