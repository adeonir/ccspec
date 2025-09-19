# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ccspec** (Claude Code Specification) is a lightweight CLI tool for specification-driven development with Claude Code integration. It generates structured templates for feature specifications, technical plans, and task lists, then provides slash commands to implement features interactively.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Run the built CLI
pnpm start

# Link globally for local testing
pnpm link --global

# Test CLI commands locally
ccspec init

# Unlink when done
pnpm unlink --global

# Lint and format code
pnpm lint

# Type check and validate code quality (CI)
pnpm check
```

## Architecture

### Hybrid Template System
- **Source**: Templates are authored as native `.md` files in `src/templates/` and `src/commands/`
- **Build**: Markdown files are imported as text using `import template from './file.md?raw'`
- **Distribution**: Templates are bundled into the executable, no external files needed
- **Purpose**: `src/templates/` contains spec templates, `src/commands/` contains Claude Code instruction files

### Key Directories
- `src/cli/` - CLI command implementations (init.ts)
- `src/templates/` - User-facing templates (spec.md, plan.md, tasks.md) + TypeScript index
- `src/commands/` - Claude Code slash command instructions + TypeScript index
- `src/utils/` - File operation helpers

### CLI Workflow
1. User runs `ccspec init` to create project structure
2. CLI creates `.claude/commands/` with slash command instruction files
3. CLI creates `.ccspec/templates/` with spec templates
4. User runs slash commands in Claude Code to generate and implement specs

### Slash Commands Flow
- `/spec` - Generates feature specification from template
- `/plan` - Creates technical implementation plan with codebase research
- `/tasks` - Generates progress tracking checklist from plan
- `/implement` - Implements the technical plan interactively, updating task checklist

### Configuration
Optional `.ccspecrc.json` supports:
- `specDir` - Custom specs folder name
- `branchPrefix` - Branch prefix to remove from folder names
- `autoNumbering` - Add 001-, 002- numbering to spec folders

### Build System
- **tsup** for fast TypeScript bundling with `.md` file loading
- **Biome** for linting and formatting
- **Lefthook** for git hooks automation
- **pnpm** as package manager

## Quality Guidelines

### Development Workflow
**After implementing features**, run this sequence to validate:
```bash
pnpm lint    # Fix formatting and linting issues
pnpm check   # Type check and validation
pnpm build   # Build the project
```

**Note**: Git hooks automatically run `pnpm lint` on pre-commit and `pnpm check + pnpm build` on pre-push.

### Commit Message Structure
Use Conventional Commit format: `<type>: <description>`

#### Commit Types
- `feat:` - New features or functionality
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring without feature changes
- `test:` - Adding or updating tests
- `chore:` - Build, dependencies, or tooling changes

#### Message Format
- **Focus on staged files only**: Describe what is actually being committed, not development decisions
- Be SPECIFIC about functionality, not generic
- Focus on WHAT functionality is being added/fixed, not HOW
- For dependencies, specify the PURPOSE
- For fixes, describe the PROBLEM being solved
- Use imperative mood (e.g., "add", "fix", "implement")
- Keep it concise - no unnecessary details visible in diff
- Avoid mentioning future tasks, architectural decisions, or reasoning behind choices

#### Body Format
- Body is OPTIONAL when the message is clear enough
- Focus on HOW the changes were implemented
- Use list items instead of bullet points for multiple changes (3-4 max recommended)
- Keep items direct and concise about implementation details
- Do NOT list all updated files or installed packages
- Do NOT mention development decisions, only what is being committed
- Do NOT mention phases or tasks from temporary todolist
