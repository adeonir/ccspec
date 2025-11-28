---
description: Create feature specification from description or PRD file
argument-hint: [description] or @file.md
allowed-tools: Read, Write, Bash(git:*)
---

<objective>
Create a feature specification document from a user-provided description or PRD file. This command transforms informal feature requests or existing PRD documents into structured specifications with user stories, functional requirements, and acceptance criteria. The spec serves as the foundation for the /plan -> /tasks -> /implement workflow.
</objective>

<context>
Verify ccspec initialization by reading in parallel:
- Templates: `.ccspec/templates/spec.md`, `.ccspec/templates/plan.md`, `.ccspec/templates/tasks.md`
- Commands: `.claude/commands/spec.md`, `.claude/commands/clarify.md`, `.claude/commands/plan.md`, `.claude/commands/tasks.md`, `.claude/commands/implement.md`

Parse `$ARGUMENTS` to determine input type:
- If empty: Ask "What feature would you like to specify? Provide a description or reference a PRD file with @path/to/file.md:"
- If contains `@file.md` reference: The file content is automatically expanded by Claude Code - use it as context
- If text only: Use as feature description (current behavior)
- If both file and text: Use file as primary context, text as additional direction
</context>

<process>
1. Process input from `$ARGUMENTS`:
   - If file reference was provided (@file.md): Use expanded file content as PRD context
   - If text description: Use as feature description
   - If both: Combine file content with additional text direction
2. Get current git branch with `git branch --show-current`
3. Ask "Current branch: {branch}. Use this branch? (y/n)"
   - If no: Ask for new branch name and create with `git switch -c {new-branch}`
4. Create directory `specs/{branch}/`
5. Read template from `.ccspec/templates/spec.md`
6. Analyze input (description or PRD content) to extract:
   - Feature name (Title Case)
   - User stories: "As a [user], I want [goal] so that [benefit]"
   - Functional requirements: "The system shall/must/should..."
   - Acceptance criteria
   - Ambiguous items marked with `[NEEDS CLARIFICATION: question]`
7. Fill template placeholders:
   - `{FEATURE_NAME}` - extracted feature name
   - `{BRANCH_NAME}` - branch name
   - `{DATE}` - current date
   - `{USER_STORIES}`, `{FUNCTIONAL_REQUIREMENTS}`, `{ACCEPTANCE_CRITERIA}`
8. Remove `<instructions>` blocks from template
9. Save to `specs/{branch}/spec.md`
</process>

<success_criteria>
- Spec file created at `specs/{branch}/spec.md`
- All placeholders replaced with meaningful content
- User stories follow correct format
- Ambiguous items clearly marked for clarification
- Response: "Spec created at specs/{branch}/spec.md. Review and use /clarify to resolve any clarifications, or /plan to continue."
</success_criteria>

<error_handling>
- **Not initialized**: "ccspec not initialized. Run 'npx ccspec init' first."
- **No git repo**: Ask to initialize git or use "unknown-branch"
- **Directory exists**: Ask to overwrite existing specification
- **Template missing**: "Run 'npx ccspec init' to restore templates."
- **File not found**: "Referenced file not found. Check the path and try again."
- **Empty file**: "Referenced file is empty. Provide a file with content or use a text description."
</error_handling>
