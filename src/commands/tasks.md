---
description: Generate implementation tasks from plan
allowed-tools: Read, Write
---

<objective>
Generate a structured task list from the technical plan. This command transforms implementation steps into actionable, trackable tasks organized by category with progress tracking, parallelization markers, and dependency information.
</objective>

<context>
Read in parallel to validate prerequisites:
- `specs/{branch}/plan.md` - must exist with `## Technical Approach` and `## Implementation Steps` sections
- `specs/{branch}/spec.md` - verify clarifications resolved
- `.ccspec/templates/tasks.md` - tasks template

Verify plan branch matches current git branch and all `[NEEDS CLARIFICATION]` items are addressed.
</context>

<process>
1. Load and parse `specs/{branch}/plan.md`
2. Extract implementation details:
   - Implementation steps
   - Dependencies and setup requirements
   - Architecture decisions
   - Testing strategy
3. Read template from `.ccspec/templates/tasks.md`
4. Generate tasks by category:
   - **Setup & Dependencies**: Project setup, dependencies, configuration
   - **Testing & Validation**: Tests based on project methodology
   - **Core Implementation**: Main feature implementation
   - **Polish & Documentation**: Cleanup, docs, final touches
5. Apply task formatting rules:
   - Number sequentially: T001, T002, T003...
   - Format: `- [ ] T### - Task description [marker]`
   - Mark `[P]` for parallel-safe tasks (different files)
   - Mark `[B]` for blocked tasks with dependencies
6. Fill template placeholders:
   - `{FEATURE_NAME}` - from plan
   - `{BRANCH_NAME}` - current branch
   - `{DATE}` - current date
   - `{TOTAL_COUNT}`, `{COMPLETED_COUNT}`, `{IN_PROGRESS_COUNT}`, `{BLOCKED_COUNT}`
   - `{SETUP_TASKS}`, `{TEST_TASKS}`, `{CORE_TASKS}`, `{POLISH_TASKS}`
7. Remove `<instructions>` blocks from template
8. Save to `specs/{branch}/tasks.md`
</process>

<task_rules>
- Each task must be specific and actionable
- Include file paths when relevant
- Respect project testing methodology (TDD, post-implementation, or none)
- Consider parallel execution for independent tasks
- Break large tasks into smaller, manageable pieces
- Use checkbox format: `- [ ] T### - Task description [P]`
</task_rules>

<success_criteria>
- Tasks file created at `specs/{branch}/tasks.md`
- All implementation steps converted to actionable tasks
- Tasks organized by category with correct numbering
- Parallelization markers applied appropriately
- Progress counters calculated correctly
- Response: "Tasks created at specs/{branch}/tasks.md. Review and use /implement next."
</success_criteria>

<error_handling>
- **No plan found**: "Run /plan first to create technical plan."
- **Incomplete plan**: "Ensure plan.md has Technical Approach and Implementation Steps sections."
- **Branch mismatch**: "Verify plan.md and current git branch are aligned."
- **Unresolved clarifications**: "Update spec.md, regenerate plan, then rerun /tasks."
- **Template missing**: "Run 'npx ccspec init' to restore templates."
</error_handling>
