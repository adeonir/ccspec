# ccspec Complete Guide

## What is ccspec?

**ccspec (Claude Code Specification)** is a lightweight CLI tool that brings structured, specification-driven development to Claude Code. It provides templates and slash commands to guide you through creating specifications, technical plans, and implementation tasks in a clear, sequential workflow.

Instead of ad-hoc feature development, ccspec establishes a consistent process: specify what you want to build, plan how to build it within your existing codebase, break it down into tasks, then implement step by step.

## Philosophy

ccspec follows a simple principle: **structured thinking before coding**. Instead of jumping straight into implementation, it guides you through a clear sequence:

- **Specification first**: Define what you want to build and why
- **Plan with context**: Analyze your existing codebase and create a technical approach
- **Break down systematically**: Convert plans into actionable, trackable tasks
- **Implement iteratively**: Execute with clear progress tracking

This approach helps you:
- Build features that actually solve the right problems
- Maintain consistency with existing code patterns
- Track progress transparently
- Reduce implementation surprises

**ccspec is designed for developers who want structure without bureaucracy** - simple templates, clear workflow, minimal configuration.

## Features

- **Quick Setup**: Initialize your project with `ccspec init`
- **Structured Templates**: Auto-generated spec, plan, and task templates
- **Claude Code Integration**: Custom slash commands and subagents for interactive development
- **Subagents**: Dedicated agents for planning, task generation, and implementation with isolated context
- **Git Integration**: Branch-based organization and workflow
- **Zero Dependencies**: Templates bundled in executable, no external files needed

## Get Started

### 1. Initialize Your Project

```bash
npx ccspec init
```

This creates the necessary templates and Claude Code commands in your project.

### Updating ccspec in a Project

```bash
npx ccspec update
```

Updates templates, commands, and agents to the latest version. Use `--force` to skip confirmation:

```bash
npx ccspec update --force
```

### Removing ccspec from a Project

```bash
npx ccspec clear
```

This removes all ccspec files:
- `.ccspec/` directory with templates
- `.claude/commands/` ccspec command files
- `specs/` directory with all specifications

The command asks for confirmation and shows exactly what will be removed before proceeding.

### 2. Start Your First Feature

```bash
# In Claude Code, use the slash commands:
/spec Add user authentication with JWT tokens
/clarify    # Optional: resolve any ambiguous items
/plan
/tasks
/implement
```

**That's it!** Follow the commands in sequence to go from idea to implementation.

### 3. What You Get

After running through the workflow, you'll have:
- **specs/research.md** - Cached codebase analysis for efficient planning
- **specs/{branch}/spec.md** - Clear requirements and user stories
- **specs/{branch}/plan.md** - Technical approach tailored to your codebase
- **specs/{branch}/tasks.md** - Actionable checklist with progress tracking
- **Working code** - Implementation following your plan

## Workflow

### 1. Create Specification (`/spec`)

```
/spec Add user authentication with JWT tokens
```

**What it does:**
- Prompts for feature description if none provided
- Creates or switches to appropriate git branch
- Generates `specs/{branch}/spec.md` with:
  - User stories and requirements
  - Acceptance criteria
  - Key entities (if applicable)

### 2. Resolve Clarifications (`/clarify`)

```
/clarify
```

**What it does:**
- Scans the specification for `[NEEDS CLARIFICATION]` items
- Interactively prompts for each unclear aspect
- Updates `specs/{branch}/spec.md` with resolved content
- If no clarifications needed, suggests proceeding to `/plan`

**Example output:**
```
Found 2 items needing clarification:

1. [NEEDS CLARIFICATION: Should export support CSV or Excel?]
   > Your answer: Both formats

2. [NEEDS CLARIFICATION: Maximum file size allowed?]
   > Your answer: 10MB

Spec updated with 2 clarifications resolved. Run /plan to continue.
```

### 3. Technical Planning (`/plan`)

```
/plan
```

**What it does:**
- Reads the specification file
- **Smart research caching**: Creates/uses `specs/research.md` to avoid repeating full codebase analysis
- Analyzes codebase patterns and architecture (cached on first run)
- Reads project guidelines (CLAUDE.md)
- Creates `specs/{branch}/plan.md` with:
  - Technical approach and decisions
  - Implementation steps
  - Dependencies and risks

### 4. Task Generation (`/tasks`)

```
/tasks
```

**What it does:**
- Converts the plan into actionable tasks
- Organizes by category (Setup, Core, Testing, Polish)
- Generates `specs/{branch}/tasks.md` with:
  - Sequential task numbering with checkboxes (T001, T002...)
  - Parallel execution markers `[P]`
  - Real-time progress tracking with checkbox updates

### 5. Implementation (`/implement`)

```
/implement              # Execute all pending tasks
/implement T001         # Execute only task T001
/implement T001-T005    # Execute tasks T001 through T005
```

**What it does:**
- Invokes the implement-agent subagent with isolated context
- Executes tasks within the specified scope (all, single, or range)
- Updates checkboxes in tasks.md as tasks complete
- Suggests meaningful commit messages

## Project Structure

After initialization, your project will have:

```
your-project/
├── .claude/
│   ├── commands/          # Claude Code slash commands
│   │   ├── spec.md
│   │   ├── clarify.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   └── implement.md
│   └── agents/            # Claude Code subagents
│       ├── plan-agent.md
│       ├── tasks-agent.md
│       └── implement-agent.md
├── .ccspec/
│   └── templates/         # Specification templates
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
└── specs/                 # Generated specifications (git-tracked)
    ├── research.md        # Project research cache (shared across features)
    └── {branch-name}/
        ├── spec.md
        ├── plan.md
        └── tasks.md
```

## Examples

### Example: Authentication Feature

```bash
# 1. Create specification
/spec Add JWT authentication with login/logout endpoints

# 2. Resolve any clarifications (optional)
/clarify

# 3. Generate technical plan
/plan

# 4. Create implementation tasks
/tasks

# 5. Execute implementation
/implement
```

**Generated Structure:**
```
specs/feature-auth/
├── spec.md           # Feature requirements and user stories
├── plan.md           # Technical approach and architecture
└── tasks.md          # Implementation checklist with checkboxes (T001-T012)
```

### Example: Branch-based Organization

```bash
git checkout -b feature/user-profiles
/spec User profile management with avatar upload
# Creates: specs/feature-user-profiles/spec.md

git checkout -b fix/login-validation
/spec Fix email validation in login form
# Creates: specs/fix-login-validation/spec.md
```

## Task Management

### Task Format

Tasks are generated with checkboxes for easy progress tracking:

```markdown
### Setup & Dependencies
- [ ] T001 - Install authentication dependencies
- [ ] T002 - Configure JWT middleware [P]
- [ ] T003 - Setup database models

### Core Implementation
- [ ] T004 - Create user registration endpoint
- [ ] T005 - Implement login functionality
- [ ] T006 - Add token validation [B]
```

### Progress Tracking

- **Unchecked**: `- [ ] T001 - Task description` (pending)
- **Checked**: `- [x] T001 - Task description` (completed)
- **Parallel**: `[P]` marker indicates tasks that can run simultaneously
- **Blocked**: `[B]` marker indicates dependencies must be resolved first

#### Real-time Updates

As `/implement` executes, checkboxes are automatically updated:

```markdown
### Core Implementation
- [x] T004 - Create user registration endpoint
- [x] T005 - Implement login functionality
- [ ] T006 - Add token validation [B]
- [ ] T007 - Create logout endpoint
```

### Selective Execution

Execute specific tasks or ranges:
- `/implement T001` - Execute only task T001
- `/implement T001-T005` - Execute tasks T001 through T005
- `/implement` - Execute all pending tasks

## Commands Reference

### CLI Commands

| Command | Description |
|---------|-------------|
| `npx ccspec init` | Initialize ccspec in current project |
| `npx ccspec update` | Update templates and commands to latest version |
| `npx ccspec update --force` | Update without confirmation prompt |
| `npx ccspec clear` | Remove all ccspec files |

### Slash Commands (Claude Code)

| Command | Description | Requires |
|---------|-------------|----------|
| `/spec [description]` | Create feature specification | - |
| `/clarify` | Resolve clarification items interactively | spec.md |
| `/plan` | Generate technical plan (via plan-agent) | spec.md |
| `/tasks` | Create implementation tasks (via tasks-agent) | plan.md |
| `/implement` | Execute all pending tasks (via implement-agent) | tasks.md |
| `/implement T001` | Execute specific task | tasks.md |
| `/implement T001-T005` | Execute range of tasks | tasks.md |

## Integration with Development Tools

### Git Integration
- Automatic branch detection and switching
- Branch-based folder organization
- Commit message suggestions with task references

### Claude Code Integration
- Custom slash commands for interactive development
- Template-based document generation
- Codebase analysis and pattern recognition

### Build Tools
- Works with any build system (npm, pnpm, yarn)
- Respects existing project conventions
- Integrates with linting and testing workflows

## Advanced Usage

### Custom Templates

Modify templates in `.ccspec/templates/` to match your workflow:

```markdown
# Feature Specification: {FEATURE_NAME}

**Epic**: {EPIC_NAME}
**Story Points**: {POINTS}

<instructions>
- Instructions for Claude on how to fill this template
- These blocks are removed when the template is processed
</instructions>

## Overview
{FEATURE_DESCRIPTION}
```

Templates use `<instructions>` blocks to provide guidance to Claude during processing. These blocks are automatically removed from the final output.

### Team Workflows

1. **Template Customization**: Modify templates for project-specific requirements
2. **Review Process**: Use generated specs for feature reviews
3. **Progress Tracking**: Share tasks.md with team to track implementation progress
4. **Implementation Modes**: Use `/implement --interactive` for collaborative development, `/implement` for solo work

## Common Issues

### Command not found: ccspec
```bash
# Use npx instead
npx ccspec init
# Or check if npm is installed
npm --version
```

### Claude Code slash commands not working
```bash
# Try updating to latest version
npx ccspec update --force
# Or clear and reinitialize
npx ccspec clear
npx ccspec init
# Check files exist
ls .claude/commands/
```

### Debug Mode

Set environment variable for verbose output:
```bash
DEBUG=ccspec npx ccspec init
```

## Development

This is a personal project. For bug reports or feature requests, please open an issue.

### Local Development Setup

```bash
git clone https://github.com/adeonir/ccspec.git
cd ccspec
pnpm install
pnpm dev           # Watch mode
pnpm build         # Production build
pnpm link --global # Test locally
```

## Issues and Feedback

If you encounter bugs or have feature suggestions, please [open an issue](https://github.com/adeonir/ccspec/issues) on GitHub.

Pull requests are not currently accepted, but feedback and discussion through issues are welcome!
