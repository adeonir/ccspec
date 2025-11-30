---
title: Generate Tasks
description: Generate implementation tasks from plan
---

<objective>
Generate a structured task list from the technical plan by invoking the tasks-agent subagent.
</objective>

<instructions>
Invoke the `tasks-agent` subagent to generate the task list.

The tasks-agent will:
1. Read and validate specs/{branch}/plan.md
2. Extract implementation steps and requirements
3. Generate specs/{branch}/tasks.md with categorized tasks
4. Apply task numbering (T001, T002...) and markers ([P], [B])

Wait for the agent to complete and inform the user of the result.
</instructions>

<error_handling>
- **No plan found**: "Run /spec:plan first to create technical plan."
- **Template missing**: "Run 'npx ccspec init' to restore templates."
</error_handling>
