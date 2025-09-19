# Task List: {FEATURE_NAME}

**Branch**: {BRANCH_NAME}
**Generated**: {DATE}
**Based on**: plan.md

## Execution Flow
```
1. Load plan.md from specs/{branch}/
2. Extract implementation steps and dependencies
3. Generate tasks by category (Setup → Testing → Core → Polish)
4. Apply parallelization rules ([P] for different files)
5. Number tasks sequentially (T001, T002...)
6. Validate task completeness
```

## Progress Overview
- Total Tasks: {TOTAL_COUNT}
- Completed: {COMPLETED_COUNT}
- In Progress: {IN_PROGRESS_COUNT}
- Blocked: {BLOCKED_COUNT}

## Task Categories

### Setup & Dependencies
{SETUP_TASKS}

### Testing & Validation
{TEST_TASKS}

### Core Implementation
{CORE_TASKS}

### Polish & Documentation
{POLISH_TASKS}

## Task Rules
- `[P]` - Can run in parallel (different files)
- `[B]` - Blocked, see notes
- `T###` - Sequential task number
- Adjust test timing based on project methodology (TDD, BDD, or post-implementation)

## Notes
- Tasks are marked complete during `/implement` execution
- Use task numbers for commit references
- Update this file as implementation progresses