# /implement Command

When user types `/implement` or `/implement --interactive` (or `/implement -i`):

## IMPORTANT: Mode Behavior
- **`/implement`** (default): Batch mode - execute all tasks automatically without any pauses
- **`/implement --interactive`** (or `-i`): Interactive mode - MUST pause after each task and wait for user confirmation

## Gate Check: Tasks Validation

1. **Verify plan and tasks exist**:
   - Check `specs/{branch}/plan.md` - If not found: Error "plan file not found. Run /plan first"
   - Check `specs/{branch}/tasks.md` - If not found: Error "tasks file not found. Run /tasks first"
2. **Validate tasks format**: Check tasks.md has properly formatted tasks
   - Verify tasks have T### numbering (T001, T002, etc.)
   - Verify tasks use checkbox format `- [ ]` or `- [x]`
   - If malformed: Error "tasks format invalid. Regenerate tasks.md using /tasks"
3. **Check task categories**: Ensure task categories are populated
   - Verify at least one category has tasks (Setup, Core, Testing, Polish)
   - If empty: Error "tasks categories empty. Regenerate tasks.md using /tasks"

## Execution Steps

1. **Load implementation context**:
   - Read plan.md for technical approach
   - Read tasks.md for task list and progress
   - Identify current task status
2. **Implementation mode**:
   - **Default (`/implement`)**: Batch mode - execute entire plan without any pauses or questions
   - **Interactive (`/implement --interactive` or `-i`)**: Interactive mode - MUST pause after each task and ask for confirmation
3. **Execute tasks sequentially**:
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
- If implementation fails: Mark task as blocked `[B]`
- If dependencies missing: Update tasks.md with setup requirements
- If clarification needed: Update spec with `[NEEDS CLARIFICATION]`

## Example Interactions

### Batch Mode (`/implement`)
```
Starting implementation of JWT Authentication System...

✓ T001 - Setup authentication middleware
✓ T002 - Create user model
✓ T003 - Add JWT token generation
✓ T004 - Create login endpoint
✓ T005 - Add authentication tests

Implementation completed. Review tasks.md and commit changes.
```

### Interactive Mode (`/implement --interactive`)
```
Starting implementation of JWT Authentication System...

✓ T001 - Setup authentication middleware
Continue with T002 - Create user model? (y/n): y

✓ T002 - Create user model
Continue with T003 - Add JWT token generation? (y/n): n

Implementation stopped. Progress saved to tasks.md
Resume anytime with /implement
```
