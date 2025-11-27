---
description: Resolve clarification items in specification
allowed-tools: Read, Write
---

<objective>
Interactively resolve all `[NEEDS CLARIFICATION]` items in the feature specification. This command guides the user through each unclear aspect, collects answers, and updates the spec.md with resolved content. Ensures the specification is complete before proceeding to /plan.
</objective>

<context>
Read `specs/{branch}/spec.md` and scan for `[NEEDS CLARIFICATION: ...]` patterns.

If no clarifications found, respond: "No clarifications needed. Spec is complete. Run /plan to continue."
</context>

<process>
1. Read `specs/{branch}/spec.md`
2. Extract all `[NEEDS CLARIFICATION: question]` items with their location
3. For each item found:
   - Display the question to the user
   - Wait for user response
   - Store the answer
4. Update spec.md replacing each `[NEEDS CLARIFICATION: question]` with the user's answer
5. Save updated spec.md
</process>

<output_format>
Display clarifications as numbered list:

```
Found {count} items needing clarification:

1. [NEEDS CLARIFICATION: {question}]
   > Your answer:

2. [NEEDS CLARIFICATION: {question}]
   > Your answer:
```

After all answers collected, confirm: "Spec updated with {count} clarifications resolved. Run /plan to continue."
</output_format>

<success_criteria>
- All `[NEEDS CLARIFICATION]` items identified and listed
- User prompted for each clarification
- spec.md updated with resolved content
- No `[NEEDS CLARIFICATION]` markers remain in spec
- Response confirms completion and suggests /plan
</success_criteria>

<error_handling>
- **No spec found**: "No specification found. Run /spec first."
- **No clarifications**: "No clarifications needed. Spec is complete. Run /plan to continue."
- **User skips item**: Keep original `[NEEDS CLARIFICATION]` marker, warn that /plan may fail
</error_handling>
