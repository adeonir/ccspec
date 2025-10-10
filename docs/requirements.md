# ccspec - Requirements Planning

## Objective
ccspec is a lightweight specification-driven development tool designed to streamline feature planning and implementation workflows. It provides structured templates for requirements, technical planning, and task management, with native integration for Claude Code through slash commands. The tool emphasizes simplicity, atomic commits, and interactive implementation to boost developer productivity.

---

## File Structure

```
project/
├── .claude/
│   └── commands/           # Slash command instructions
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       └── implement.md
├── .ccspec/
│   └── templates/          # Default templates
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── .ccspecrc.json          # Optional configuration
├── specs/                  # Generated specifications
│   ├── research.md         # Cached codebase analysis
│   └── <branch-name>/      # Created on demand
│       ├── spec.md         # Feature specification
│       ├── plan.md         # Technical plan
│       └── tasks.md        # Implementation tasks
└── CLAUDE.md               # Project guidelines
```

---

## CLI Commands

### `npx ccspec init`
Creates initial ccspec structure in project
- Creates `.claude/commands/` with slash command instructions
- Creates `.ccspec/templates/` with the 3 default templates
- Does **not** create `.ccspecrc.json` by default

### `npx ccspec init --config`
Same as `init` but also creates `.ccspecrc.json` with customizable settings


---

## Slash Commands (Claude Code)

### `/spec [description]`
Generates feature specification using `$ARGUMENTS` variable

**Frontmatter:**
```yaml
description: Create feature specification from description
argument-hint: [description]
allowed-tools: Read, Write, Bash(git:*)
```

**Execution flow:**
1. If description empty, asks interactively for feature description
2. Verifies ccspec initialization
3. Checks for git repository:
   - If no git: asks "Initialize git? (y/n)"
   - If yes: runs `git init` and uses "main" branch
   - If no: continues with "unknown-branch"
4. If git exists, asks: "Use current branch? (y/n)"
5. If no, asks for new branch name and creates it with `git switch -c`
6. Loads `.ccspecrc.json` if exists
7. Creates `specs/<branch>/` if it doesn't exist
8. Generates feature specification from description
9. Marks ambiguities with `[NEEDS CLARIFICATION]`
10. Saves as `specs/<branch>/spec.md`

### `/plan`
Generates technical plan with codebase research and caching

**Frontmatter:**
```yaml
description: Generate technical plan from specification
allowed-tools: Read, Write, Grep, Glob
```

**Execution flow:**
1. Verifies if `spec.md` exists
2. Validates spec completeness (required sections)
3. Checks for unresolved `[NEEDS CLARIFICATION]` items
4. Reads `spec.md` + `CLAUDE.md` for context
5. Checks for `specs/research.md`
   - If exists: uses cached research
   - If not exists: performs full codebase analysis and saves to `specs/research.md`
6. Performs feature-specific codebase analysis
7. Generates technical plan with research findings, patterns, and decisions
8. Saves as `specs/<branch>/plan.md`

### `/tasks`
Generates progress tracking checklist with checkboxes

**Frontmatter:**
```yaml
description: Generate implementation tasks from plan
allowed-tools: Read, Write
```

**Execution flow:**
1. Verifies if `plan.md` exists
2. Validates plan completeness (required sections)
3. Checks context consistency (branch alignment)
4. Analyzes plan and extracts implementation steps
5. Generates numbered tasks with checkboxes (`- [ ] T001`, `- [ ] T002`...)
6. Marks parallel tasks with `[P]` and blocked tasks with `[B]`
7. Organizes by category (Setup, Core, Testing, Polish)
8. Saves as `specs/<branch>/tasks.md`

### `/implement`
Implements the technical plan with checkbox tracking

**Frontmatter:**
```yaml
description: Execute implementation tasks interactively or in batch
allowed-tools: Read, Write, Edit, Bash(*), Glob, Grep
```

**Execution flow:**
1. Verifies `plan.md` and `tasks.md` exist
2. Validates tasks format and context consistency
3. Loads implementation context from plan
4. Executes tasks according to plan approach
5. Respects parallelization `[P]` and blocking `[B]` markers
6. Updates checkboxes in `tasks.md` from `- [ ]` to `- [x]` as tasks complete

**Modes:**
- `/implement` - Batch mode (default): executes all tasks automatically
- `/implement --interactive` or `/implement -i` - Interactive mode: pauses after each task asking "Continue with T### - [task name]? (y/n)"

---

## Optional Configuration (.ccspecrc.json)

```json
{
  "branchPrefix": "feature/",
  "autoNumbering": false
}
```

**Properties:**
- `branchPrefix` - Branch prefix (e.g., `"feat/"`)
- `autoNumbering` - Automatic numbering 001-, 002-

---


## Complete Workflow

```bash
# 1. Initial setup (once per project)
npx ccspec init

# 2. In Claude Code
/spec Create JWT authentication with refresh tokens
# /spec will ask about using current branch or creating a new one
# Review spec.md and iterate if necessary

# 3. Generate plan
/plan
# Review plan.md and iterate if necessary

# 4. Generate tasks
/tasks
# Review tasks.md

# 5. Implement
/implement              # Batch mode - executes all tasks
/implement --interactive # Interactive mode - pauses between tasks
# Updates checkboxes in tasks.md as tasks complete
# Developer reviews and commits changes manually
```

---

## Key Features

- **Simple Templates** - Direct, focused templates without over-engineering
- **YAML Frontmatter** - Commands use frontmatter with security-focused tool restrictions
- **Smart Caching** - Research results cached in `specs/research.md` for faster planning
- **Optional Configuration** - Sensible defaults with optional customization
- **Interactive Implementation** - Step-by-step task execution with `/implement`
- **Progress Tracking** - Real-time checkbox updates in `tasks.md`
- **Claude Code Integration** - Native slash commands for seamless workflow

---

## ccspec Principles

1. **Simplicity first** - Direct templates, no over-engineering
2. **Flexibility** - Optional configuration, sensible defaults
3. **Productivity** - Fast commands, optimized workflow
5. **Claude Code first** - Focused on a quality AI agent

---

## Next Implementation Steps

1. Create base templates (spec.md, plan.md, tasks.md)
2. Develop CLI in Node
3. Write instructions for .claude.md (slash commands)
4. Test with example feature
5. Iterate and refine

---

**ccspec = Simplified Spec-Driven Development + productivity focus**
