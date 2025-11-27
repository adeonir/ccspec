---
description: Execute implementation tasks interactively or in batch
allowed-tools: Read, Write, Edit, Bash(*), Glob, Grep
---

<objective>
Execute implementation tasks from the task list. Supports two modes: batch (default) for automatic execution of all tasks, and interactive (-i) for step-by-step confirmation. Tracks progress by updating task checkboxes and suggests atomic commits.
</objective>

<context>
Read in parallel to validate prerequisites:
- `specs/{branch}/plan.md` - technical approach reference
- `specs/{branch}/tasks.md` - task list with T### numbering and checkbox format

Validate:
- Tasks have T### numbering (T001, T002, etc.)
- Tasks use checkbox format `- [ ]` or `- [x]`
- All files reference same feature and branch
- At least one category has tasks
</context>

<modes>
**Batch mode** (`/implement`):
- Execute all tasks automatically without pauses
- No user confirmation between tasks

**Interactive mode** (`/implement --interactive` or `-i`):
- Pause after each task completion
- Ask "Continue with T### - [task name]? (y/n)"
- Wait for user confirmation before proceeding
</modes>

<process>
1. Load implementation context:
   - Read plan.md for technical approach
   - Read tasks.md for task list and current progress
   - Identify incomplete tasks (unchecked boxes)
2. Execute tasks following plan.md approach:
   - Implement each task according to specifications
   - Respect parallelization markers `[P]`
   - Handle blocked tasks `[B]` appropriately
3. Parallel execution strategy for `[P]` tasks:
   - Group consecutive parallel-safe tasks
   - Execute simultaneously using multiple tool calls
   - Complete entire group before proceeding
4. After each task completion:
   - Update tasks.md: change `- [ ]` to `- [x]`
   - Update progress counters
   - **Batch**: Continue automatically
   - **Interactive**: Ask for confirmation
5. Suggest commit messages with task references (e.g., "feat: implement T001, T002")
</process>

<implementation_guidelines>
- Follow technical approach from plan.md
- Match existing code patterns in the project
- Respect project testing methodology
- Create atomic, focused changes
- Include file paths in task updates
</implementation_guidelines>

<interactive_controls>
- `y` / `yes`: Continue to next task
- `n` / `no`: Stop implementation and save progress
</interactive_controls>

<success_criteria>
- All tasks executed successfully
- tasks.md updated with checked boxes for completed tasks
- Progress counters reflect actual completion state
- Code follows project patterns and plan.md approach
- Meaningful commit suggestions provided
</success_criteria>

<error_handling>
- **No plan found**: "Run /plan first to create technical plan."
- **No tasks found**: "Run /tasks first to generate task list."
- **Invalid task format**: "Regenerate tasks.md using /tasks."
- **File inconsistency**: "Verify spec.md, plan.md, and tasks.md reference same feature."
- **Task blocked**: Mark as `[B]` and document dependency.
</error_handling>
