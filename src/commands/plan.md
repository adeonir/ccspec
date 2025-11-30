---
title: Generate Plan
description: Generate technical plan from specification
---

<objective>
Generate a technical implementation plan from the feature specification by invoking the plan-agent subagent.
</objective>

<instructions>
Invoke the `plan-agent` subagent to generate the technical plan.

The plan-agent will:
1. Read and validate specs/{branch}/spec.md
2. Analyze CLAUDE.md for project context
3. Research codebase patterns (cached in specs/research.md)
4. Generate specs/{branch}/plan.md with technical approach

Wait for the agent to complete and inform the user of the result.

If the spec has unresolved `[NEEDS CLARIFICATION]` items, the agent will ask whether to continue.
</instructions>

<error_handling>
- **No spec found**: "Run /spec:create first to create feature specification."
- **Template missing**: "Run 'npx ccspec init' to restore templates."
</error_handling>
