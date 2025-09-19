# /tasks Command

When user types `/tasks`:

## Execution Steps

1. **Verify plan exists**: Check `specs/{branch}/plan.md`
   - If not found: Error "No plan found. Run /plan first"
2. **Load plan content**: Read and parse the technical plan
3. **Extract implementation details**:
   - Implementation steps from plan
   - Dependencies and setup requirements
   - Architecture decisions
   - Testing strategy (if any)
4. **Copy template** from `.nanospec/templates/tasks.md`
5. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
6. **Generate tasks by category**:
   - **Setup & Dependencies**: Project setup, dependencies, configuration
   - **Testing & Validation**: Tests based on project methodology
   - **Core Implementation**: Main feature implementation
   - **Polish & Documentation**: Cleanup, docs, final touches
   - **Format each task with checkboxes**: `- [ ] T### - Task description`
7. **Apply task rules**:
   - Number sequentially (T001, T002, T003...)
   - Mark `[P]` for tasks that can run in parallel (different files)
   - Mark `[B]` for blocked tasks with dependencies
8. **Fill template placeholders**:
   - Replace `{FEATURE_NAME}` with plan feature name
   - Replace `{BRANCH_NAME}` with current branch
   - Replace `{DATE}` with current date
   - Replace task category placeholders with generated tasks
   - Calculate and replace progress overview numbers
9. **Save as**: `specs/{branch}/tasks.md`
10. **Response**: "Task list created at {path}. Use /implement to start"

## Task Generation Rules
- Each task should be specific and actionable
- Include file paths when relevant
- Respect project's testing methodology (TDD, post-implementation, or none)
- Consider parallel execution for independent tasks
- Break large tasks into smaller, manageable pieces
- **Use checkbox format**: `- [ ] T### - Task description [P]` (unchecked by default)
- Add parallelization markers `[P]` and blocking markers `[B]` after task description

## Example Output
```
Task list created at specs/feature-auth/tasks.md
Generated 12 implementation tasks. Use /implement to start interactive implementation.

Example tasks format:
- [ ] T001 - Setup authentication middleware
- [ ] T002 - Create user model [P]
- [ ] T003 - Add JWT token generation
- [ ] T004 - Create login endpoint [B]
```
