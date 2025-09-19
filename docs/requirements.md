# NanoSpec - Requirements Planning

## Objective
NanoSpec is a lightweight specification-driven development tool designed to streamline feature planning and implementation workflows. It provides structured templates for requirements, technical planning, and task management, with native integration for Claude Code through slash commands. The tool emphasizes simplicity, atomic commits, and interactive implementation to boost developer productivity.

---

## File Structure

```
project/
├── .nanospec/
│   └── templates/          # Default templates
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── .nanospecrc.json        # Optional configuration
├── specs/                  # Or as per specDir config
│   └── <branch-name>/      # Created on demand
│       ├── spec.md         # Filled copy of template
│       ├── plan.md         # Includes internal research
│       └── tasks.md        # List of executable tasks
└── .claude.md              # Uses existing
```

---

## CLI Commands

### `nanospec init`
Creates initial NanoSpec structure in project
- Creates `.nanospec/templates/` with the 3 default templates
- Does **not** create `.nanospecrc.json` by default

### `nanospec init --config`
Same as `init` but also creates `.nanospecrc.json` with customizable settings


---

## Slash Commands (Claude Code)

### `/spec [optional prompt]`
Generates feature specification
1. If prompt empty → asks interactively
2. Checks for git repository:
   - If no git → asks "Initialize git? (y/n)"
   - If yes → runs `git init` and uses "main" branch
   - If no → continues with "unknown-branch"
3. If git exists → asks: "Use current branch? (y/n)"
4. If no → asks for new branch name and creates it with `git switch -c`
5. Creates `specs/<branch>/` if it doesn't exist
6. Analyzes prompt and generates specification content
7. Copies `.nanospec/templates/spec.md` and fills with generated content
8. Marks ambiguities with `[NEEDS CLARIFICATION]`
9. Saves as `specs/<branch>/spec.md`

### `/plan`
Generates technical plan with research
1. Verifies if `spec.md` exists
2. Reads `spec.md` + `.claude.md` for context
3. Does codebase research (plan mode style)
4. Copies `.nanospec/templates/plan.md` and fills with research findings and technical decisions
5. Saves as `specs/<branch>/plan.md`

### `/tasks`
Generates progress tracking checklist
1. Verifies if `plan.md` exists
2. Analyzes plan and extracts key milestones and deliverables
3. Copies `.nanospec/templates/tasks.md` and fills with checklist items
4. Creates numbered tasks (T001, T002...) for progress tracking
5. Marks parallel tasks with `[P]`
6. Saves as `specs/<branch>/tasks.md` (used for progress verification, not implementation)

### `/implement`
Implements the technical plan interactively
1. Reads `plan.md` for implementation details
2. Executes the technical plan step by step
3. After each major step:
   - Updates corresponding items in `tasks.md` as completed
   - Asks: "Continue with next step? (y/n/q)"
4. Uses the detailed technical approach from the plan
5. Developer manually commits changes when ready

**Variations:**
- `/implement` → Interactive mode (default)
- `/implement --all` → Executes entire plan without pausing

---

## Optional Configuration (.nanospecrc.json)

```json
{
  "branchPrefix": "feature/",
  "specDir": "specs",
  "autoNumbering": false
}
```

**Properties:**
- `branchPrefix` - Branch prefix (e.g., `"feat/"`)
- `specDir` - Specs folder name (e.g., `"specs"`)
- `autoNumbering` - Automatic numbering 001-, 002-

---


## Complete Workflow

```bash
# 1. Initial setup (once per project)
nanospec init

# 2. New feature
git checkout -b feature/user-auth

# 3. In Claude Code
/spec Create JWT authentication with refresh tokens
# Review spec.md and iterate if necessary

# 5. Generate plan
/plan
# Review plan.md and iterate if necessary

# 7. Generate tasks
/tasks

# 8. Implement
/implement
# Implements plan.md step by step
# Updates tasks.md checklist as milestones are completed
# Developer reviews and commits changes manually
```

---

## Key Features

- **Simple Templates** - Direct, focused templates without over-engineering
- **Optional Configuration** - Sensible defaults with optional customization
- **Interactive Implementation** - Step-by-step task execution with `/implement`
- **Atomic Commits** - Built-in workflow for clean commit history
- **Claude Code Integration** - Native slash commands for seamless workflow

---

## NanoSpec Principles

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

**NanoSpec = Simplified Spec-Driven Development + productivity focus**
