---
description: Create feature specification from description
argument-hint: [description]
allowed-tools: Read, Write, Bash(git:*)
---

<objective>
Create a feature specification document from a user-provided description. This command transforms informal feature requests into structured specifications with user stories, functional requirements, and acceptance criteria. The spec serves as the foundation for the /plan -> /tasks -> /implement workflow.
</objective>

<context>
Verify ccspec initialization by reading in parallel:
- Templates: `.ccspec/templates/spec.md`, `.ccspec/templates/plan.md`, `.ccspec/templates/tasks.md`
- Commands: `.claude/commands/spec.md`, `.claude/commands/clarify.md`, `.claude/commands/plan.md`, `.claude/commands/tasks.md`, `.claude/commands/implement.md`

If `$ARGUMENTS` is empty, ask: "What feature would you like to specify? Please describe the functionality you want to implement:"
</context>

<process>
1. Get current git branch with `git branch --show-current`
2. Ask "Current branch: {branch}. Use this branch? (y/n)"
   - If no: Ask for new branch name and create with `git switch -c {new-branch}`
3. Load `.ccspecrc.json` configuration (silently use defaults if missing):
   - Defaults: `{"branchPrefix": "", "autoNumbering": false}`
   - If invalid JSON: Warn and use defaults
4. Process branch name:
   - Remove `branchPrefix` if configured
   - Add sequential numbering (001-, 002-) if `autoNumbering: true`
5. Create directory `specs/{processed-branch}/`
6. Read template from `.ccspec/templates/spec.md`
7. Analyze user description to extract:
   - Feature name (Title Case)
   - User stories: "As a [user], I want [goal] so that [benefit]"
   - Functional requirements: "The system shall/must/should..."
   - Acceptance criteria
   - Ambiguous items marked with `[NEEDS CLARIFICATION: question]`
8. Fill template placeholders:
   - `{FEATURE_NAME}` - extracted feature name
   - `{BRANCH_NAME}` - final branch name
   - `{DATE}` - current date
   - `{USER_STORIES}`, `{FUNCTIONAL_REQUIREMENTS}`, `{ACCEPTANCE_CRITERIA}`
9. Remove `<instructions>` blocks from template
10. Save to `specs/{branch}/spec.md`
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
</error_handling>
