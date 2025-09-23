# /tasks Command

When user types `/tasks`:

## Gate Check: Plan Validation

1. **Verify plan exists**: Check `specs/{branch}/plan.md`
   - If not found: Error "plan file not found. Run /plan first"
2. **Validate plan completeness**: Check plan has required sections
   - Verify plan contains `## Technical Approach` section
   - Verify plan contains `## Implementation Steps` section
   - If missing: Error "plan incomplete. Ensure plan has Technical Approach and Implementation Steps sections"
3. **Check spec clarifications**: Verify all `[NEEDS CLARIFICATION]` items from spec are addressed
   - Compare with original spec.md to ensure clarifications are resolved
   - If unresolved items remain: Error "spec has unresolved clarifications. Update spec.md and regenerate plan"

## Execution Steps

1. **Load plan content**: Read and parse the technical plan
2. **Extract implementation details**:
   - Implementation steps from plan
   - Dependencies and setup requirements
   - Architecture decisions
   - Testing strategy (if any)
3. **Copy template** from `.ccspec/templates/tasks.md`
4. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
5. **Generate tasks by category**:
   Use think to organize work strategically:
   - Analyze implementation steps complexity and dependencies
   - Identify tasks that can run in parallel vs sequential requirements
   - Consider project testing methodology and quality standards
   - Plan logical execution sequence and task groupings
   - Evaluate task granularity for manageable implementation

   Generate tasks by category:
   - **Setup & Dependencies**: Project setup, dependencies, configuration
   - **Testing & Validation**: Tests based on project methodology
   - **Core Implementation**: Main feature implementation
   - **Polish & Documentation**: Cleanup, docs, final touches
   - **Format each task with checkboxes**: `- [ ] T### - Task description`
6. **Apply task rules**:
   - Number sequentially (T001, T002, T003...)
   - Mark `[P]` for tasks that can run in parallel (different files)
   - Mark `[B]` for blocked tasks with dependencies
7. **Fill template placeholders**:
   - Replace `{FEATURE_NAME}` with plan feature name
   - Replace `{BRANCH_NAME}` with current branch
   - Replace `{DATE}` with current date
   - Replace task category placeholders with generated tasks
   - Calculate and replace progress overview numbers
8. **Save as**: `specs/{branch}/tasks.md`
9. **Response**: "Tasks created at specs/{branch}/tasks.md. Review and use /implement next."

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
