---
title: Execute Tasks
description: Execute implementation tasks
argument-hint: "[T001] [T001-T005]"
---

<objective>
Execute implementation tasks from the task list by invoking the implement-agent subagent.
</objective>

<syntax>
- `/implement` - Execute all pending tasks
- `/implement T001` - Execute only task T001
- `/implement T001-T005` - Execute tasks T001 through T005
</syntax>

<instructions>
Invoke the `implement-agent` subagent to execute the tasks.

Parse the user argument to determine scope:
- No argument: execute all pending tasks
- T### format: execute only that specific task
- T###-T### format: execute the range of tasks

The implement-agent will:
1. Read specs/{branch}/plan.md for technical context
2. Read specs/{branch}/tasks.md for task list
3. Execute tasks within the specified scope
4. Update task checkboxes and progress counters
5. Suggest atomic commits

Wait for the agent to complete and inform the user of the result.
</instructions>

<error_handling>
- **No plan found**: "Run /spec:plan first to create technical plan."
- **No tasks found**: "Run /spec:tasks first to generate task list."
- **Invalid task format**: "Use T### or T###-T### format."
</error_handling>
