# /implement Command

When user types `/implement` or `/implement --all`:

## Execution Steps

1. **Verify plan and tasks exist**:
   - Check `specs/{branch}/plan.md` - If not found: Error "No plan found. Run /plan first"
   - Check `specs/{branch}/tasks.md` - If not found: Error "No tasks found. Run /tasks first"
2. **Load implementation context**:
   - Read plan.md for technical approach
   - Read tasks.md for task list and progress
   - Identify current task status
3. **Implementation mode**:
   - **Default (`/implement`)**: Interactive mode with pauses
   - **All (`/implement --all`)**: Execute entire plan without pausing
4. **Execute tasks sequentially**:
   - Follow the technical approach from plan.md
   - Implement each task according to specifications
   - Respect parallelization markers `[P]` when possible
   - Handle blocked tasks `[B]` appropriately
5. **After each major step**:
   - Update tasks.md marking completed tasks
   - **Interactive mode**: Ask "Continue with next step? (y/n/q)"
   - **All mode**: Continue automatically
6. **Progress tracking**:
   - Mark tasks as completed in tasks.md
   - Update progress overview counters
   - Create commit suggestions with task numbers

## Interactive Controls
- **y/yes**: Continue to next task
- **n/no**: Pause implementation (resume later)
- **q/quit**: Stop implementation entirely

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

## Example Interaction
```
Starting implementation of JWT Authentication System...

✓ T001 - Setup authentication middleware
Continue with T002 - Create user model? (y/n/q): y

✓ T002 - Create user model
✓ T003 - Add JWT token generation
Continue with T004 - Create login endpoint? (y/n/q): n

Implementation paused. Progress saved to tasks.md
Resume anytime with /implement
```
