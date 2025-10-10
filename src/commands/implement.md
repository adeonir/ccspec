---
description: Execute implementation tasks interactively or in batch
allowed-tools: Read, Write, Edit, Bash(*), Glob, Grep
---

When user types `/implement` or `/implement --interactive` (or `/implement -i`):

## IMPORTANT: Mode Behavior

- **`/implement`** (default): Batch mode - execute all tasks automatically without any pauses
- **`/implement --interactive`** (or `-i`): Interactive mode - MUST pause after each task and wait for user confirmation

## Gate Check: Context Validation & Tasks Analysis

1. **Verify plan and tasks exist**: Use Read tool to check required files in parallel:
   - Check `specs/{branch}/plan.md` - If not found: Error "plan file not found. Run /plan first"
   - Check `specs/{branch}/tasks.md` - If not found: Error "tasks file not found. Run /tasks first"
2. **Validate tasks format**: Check tasks.md has properly formatted tasks
   - Verify tasks have T### numbering (T001, T002, etc.)
   - Verify tasks use checkbox format `- [ ]` or `- [x]`
   - If malformed: Error "tasks format invalid. Regenerate tasks.md using /tasks"
3. **Context consistency validation**:
   - Verify all files (spec.md, plan.md, tasks.md) reference same feature and branch
   - Check that task numbering is sequential and consistent
   - Ensure plan implementation steps align with generated tasks
4. **Check task categories**: Ensure task categories are populated
   - Verify at least one category has tasks (Setup, Core, Testing, Polish)
   - If empty: Error "tasks categories empty. Regenerate tasks.md using /tasks"

## Execution Steps

1. **Load implementation context**: Use Read tool to load required context:
   - Read plan.md for technical approach
   - Read tasks.md for task list and progress
   - Identify current task status
2. **Implementation mode**:
   - **Default (`/implement`)**: Batch mode - execute entire plan without any pauses or questions
   - **Interactive (`/implement --interactive` or `-i`)**: Interactive mode - MUST pause after each task and ask for confirmation
3. **Execute tasks sequentially**:
   - Analyze code integration requirements for each task
   - Consider testing approach and validation strategy
   - Evaluate implementation alternatives and trade-offs
   - Plan commit strategy for atomic, focused changes
   - Assess task dependencies and parallel execution opportunities

   Follow implementation guidelines:
   - Follow the technical approach from plan.md
   - Implement each task according to specifications
   - Respect parallelization markers `[P]` when possible
   - Handle blocked tasks `[B]` appropriately

### Parallel Task Execution Strategy

- **Group parallel tasks**: Identify all consecutive [P] tasks that can run together
- **Batch execution**: Execute all [P] tasks simultaneously using multiple tool calls in single message
- **Wait for completion**: Complete entire [P] group before proceeding to next tasks
- **Sequential for [B]**: Execute [B] tasks one by one, respecting dependencies

4. **After each task completion**:
   - Update tasks.md marking completed tasks by changing `- [ ]` to `- [x]`
   - **Batch mode (`/implement`)**: Continue to next task automatically without any prompts
   - **Interactive mode (`/implement --interactive` or `-i`)**: ALWAYS ask "Continue with T### - [task name]? (y/n)" and wait for user input
5. **Progress tracking**:
   - Mark tasks as completed in tasks.md by checking boxes: `- [x] T### - Task description`
   - Update progress overview counters (Completed count)
   - Create commit suggestions with task numbers

## Interactive Controls

- **y/yes**: Continue to next task
- **n/no**: Stop implementation and save progress

## Implementation Guidelines

- Follow the technical approach outlined in plan.md
- Implement according to existing code patterns
- Respect project's testing methodology
- Create atomic, focused changes
- Suggest meaningful commit messages with task references

## Error Handling

- **Prerequisites Missing**: Run `/plan` first to create technical plan, then `/tasks` to generate implementation task list
- **Invalid task format**: Run `/tasks` to regenerate properly formatted task list
- **File inconsistency**: Verify spec.md, plan.md, and tasks.md reference same feature and branch
- **Task implementation blocked**: Mark task as `[B]` in tasks.md and add dependency information
- **Mode-specific issues**: Switch between batch (`/implement`) and interactive (`/implement -i`) modes as needed
