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

### `npx nanospec init`
Creates initial NanoSpec structure in project
- Creates `.claude/commands/` with slash command instructions
- Creates `.nanospec/templates/` with the 3 default templates
- Does **not** create `.nanospecrc.json` by default

### `npx nanospec init --config`
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
Generates progress tracking checklist with checkboxes
1. Verifies if `plan.md` exists
2. Analyzes plan and extracts key milestones and deliverables
3. Copies `.nanospec/templates/tasks.md` and fills with checkbox tasks
4. Creates numbered tasks with checkboxes (- [ ] T001, - [ ] T002...)
5. Marks parallel tasks with `[P]` and blocked tasks with `[B]`
6. Saves as `specs/<branch>/tasks.md` (used for progress verification and real-time tracking)

### `/implement`
Implements the technical plan with checkbox tracking
1. Reads `plan.md` for implementation details
2. Executes the technical plan step by step
3. After each task completion:
   - Updates checkboxes in `tasks.md` from `- [ ]` to `- [x]`
   - Updates progress counters
4. Uses the detailed technical approach from the plan
5. Developer manually commits changes when ready

**Variations:**
- `/implement` → Batch mode (default) - executes all tasks automatically
- `/implement --interactive` (or `-i`) → Interactive mode - pauses between tasks asking "Continue with T### - [task name]? (y/n)"

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
npx nanospec init

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
