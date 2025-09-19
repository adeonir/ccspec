# /implement Command

When user types `/implement` or `/implement --interactive` (or `/implement -i`):

## IMPORTANT: Mode Behavior
- **`/implement`** (default): Batch mode - execute all tasks automatically without any pauses
- **`/implement --interactive`** (or `-i`): Interactive mode - MUST pause after each task and wait for user confirmation

## Execution Steps

1. **Verify plan and tasks exist**:
   - Check `specs/{branch}/plan.md` - If not found: Error "No plan found. Run /plan first"
   - Check `specs/{branch}/tasks.md` - If not found: Error "No tasks found. Run /tasks first"
2. **Load implementation context**:
   - Read plan.md for technical approach
   - Read tasks.md for task list and progress
   - Identify current task status
3. **Implementation mode**:
   - **Default (`/implement`)**: Batch mode - execute entire plan without any pauses or questions
   - **Interactive (`/implement --interactive` or `-i`)**: Interactive mode - MUST pause after each task and ask for confirmation
4. **Execute tasks sequentially**:
   - Follow the technical approach from plan.md
   - Implement each task according to specifications
   - Respect parallelization markers `[P]` when possible
   - Handle blocked tasks `[B]` appropriately
5. **After each task completion**:
   - Update tasks.md marking completed tasks by changing `- [ ]` to `- [x]`
   - **Batch mode (`/implement`)**: Continue to next task automatically without any prompts
   - **Interactive mode (`/implement --interactive` or `-i`)**: ALWAYS ask "Continue with T### - [task name]? (y/n)" and wait for user input
6. **Progress tracking**:
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

All tasks completed successfully!
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
