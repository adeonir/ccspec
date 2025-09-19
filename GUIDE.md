# ccspec Complete Guide

This guide covers everything you need to know about using ccspec for specification-driven development with Claude Code.

## Features

- **Quick Setup**: Initialize your project with `ccspec init`
- **Structured Templates**: Auto-generated spec, plan, and task templates
- **Claude Code Integration**: Custom slash commands for interactive development
- **Git Integration**: Branch-based organization and workflow
- **Configurable**: Optional `.ccspecrc.json` for customization
- **Zero Dependencies**: Templates bundled in executable, no external files needed

## Workflow

### Complete Development Cycle

```mermaid
graph LR
    A[/spec] --> B[/plan] --> C[/tasks] --> D[/implement]
    A --> A1[spec.md]
    B --> B1[plan.md]
    C --> C1[tasks.md]
    D --> D1[Feature Implementation]
```

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

### 2. Technical Planning (`/plan`)

```
/plan
```

**What it does:**
- Reads the specification file
- Analyzes codebase patterns and architecture
- Reads project guidelines (CLAUDE.md)
- Creates `specs/{branch}/plan.md` with:
  - Technical approach and decisions
  - Implementation steps
  - Dependencies and risks

### 3. Task Generation (`/tasks`)

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

### 4. Implementation (`/implement`)

```
/implement              # Batch mode - execute all tasks
/implement --interactive # Interactive mode with pauses
/implement -i           # Short form of --interactive
```

**What it does:**
- Executes tasks according to the plan
- Updates checkboxes in tasks.md as tasks complete
- Suggests meaningful commit messages
- Optional pauses for confirmation between tasks (use `--interactive` flag)

## Project Structure

After initialization, your project will have:

```
your-project/
├── .claude/
│   └── commands/          # Claude Code slash commands
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       └── implement.md
├── .ccspec/
│   └── templates/         # Specification templates
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── specs/                 # Generated specifications (git-tracked)
│   └── {branch-name}/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
└── .ccspecrc.json         # Optional configuration
```

## Configuration

Create `.ccspecrc.json` to customize behavior:

```json
{
  "specDir": "specs",           // Custom specs folder name
  "branchPrefix": "feature/",   // Remove prefix from folder names
  "autoNumbering": true         // Add 001-, 002- numbering
}
```

### Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `specDir` | `"specs"` | Directory name for specifications |
| `branchPrefix` | `""` | Git branch prefix to remove from folder names |
| `autoNumbering` | `false` | Add sequential numbering to spec folders |

## Examples

### Example: Authentication Feature

```bash
# 1. Create specification
/spec Add JWT authentication with login/logout endpoints

# 2. Generate technical plan
/plan

# 3. Create implementation tasks
/tasks

# 4. Execute implementation
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

### Interactive Controls

When using `/implement --interactive`:
- **`y`**: Continue to next task
- **`n`**: Stop implementation and save progress

## Commands Reference

### CLI Commands

| Command | Description |
|---------|-------------|
| `npx ccspec init` | Initialize ccspec in current project |
| `npx ccspec init --config` | Initialize with `.ccspecrc.json` |

### Slash Commands (Claude Code)

| Command | Description | Requires |
|---------|-------------|----------|
| `/spec [description]` | Create feature specification | - |
| `/plan` | Generate technical plan | spec.md |
| `/tasks` | Create implementation tasks | plan.md |
| `/implement` | Execute implementation (batch mode) | tasks.md |
| `/implement --interactive` | Execute with interactive pauses | tasks.md |

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
<!-- .ccspec/templates/spec.md -->
# Feature Specification: {FEATURE_NAME}

**Epic**: {EPIC_NAME}
**Story Points**: {POINTS}
<!-- ... customize as needed ... -->
```

### Team Workflows

1. **Shared Configuration**: Commit `.ccspecrc.json` to establish team standards
2. **Template Customization**: Modify templates for project-specific requirements
3. **Branch Conventions**: Use `branchPrefix` to enforce naming patterns
4. **Review Process**: Use generated specs for feature reviews
5. **Progress Tracking**: Share tasks.md with team to track implementation progress
6. **Implementation Modes**: Use `/implement --interactive` for collaborative development, `/implement` for solo work

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
# Reinitialize
npx ccspec init
# Check files exist
ls .claude/commands/
```

### Configuration not loading
```bash
# Verify JSON syntax
cat .ccspecrc.json | jq .
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
