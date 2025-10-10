---
description: Create feature specification from description
argument-hint: [description]
allowed-tools: Read, Write, Bash(git:*)
---

When user types `/spec $ARGUMENTS`:

## Gate Check: Initialization

Verify ccspec initialization using Read tool in parallel:
- Templates: `.ccspec/templates/spec.md`, `.ccspec/templates/plan.md`, `.ccspec/templates/tasks.md`
- Commands: `.claude/commands/spec.md`, `.claude/commands/plan.md`, `.claude/commands/tasks.md`, `.claude/commands/implement.md`
- If any file not found: Error "ccspec not initialized or incomplete. Run 'npx ccspec init' in the project root to set up or update all required templates and commands."

## Input Validation

**Check for description parameter**:
- If `$ARGUMENTS` is empty: Ask "What feature would you like to specify? Please describe the functionality you want to implement:"
- Wait for user response before proceeding

## Execution Steps

1. **Get current git branch**: `git branch --show-current`
2. **Ask about branch usage**:
   - "Current branch: {current-branch}. Use this branch? (y/n)"
   - If **yes**: Continue with current branch
   - If **no**: Ask "Enter new branch name:" and create it with `git switch -c {new-branch}`
3. **Load configuration**:
   - Try to read `.ccspecrc.json` with Read tool
   - **NEVER** show "Error reading file" messages for missing config
   - **If file doesn't exist**: Use defaults `{"branchPrefix": "", "autoNumbering": false}`
   - **If file exists but invalid JSON**: Show warning "Invalid .ccspecrc.json format, using defaults" and use defaults
4. **Process branch name**:
   - Remove `branchPrefix` if present in config
   - Add auto-numbering if `autoNumbering: true` (scan existing folders)
5. **Create directory**: `specs/{processed-branch}/`
6. **Copy template** from `.ccspec/templates/spec.md`
7. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
8. **Fill template** based on user description:
   - Analyze the user description and extract requirements
   - Understand core functionality and scope
   - Identify user roles and workflows
   - Generate user stories: "As a [user], I want [goal] so that [benefit]"
   - Create testable functional requirements
   - Spot ambiguous areas needing clarification

   Replace template placeholders:
   - Replace `{FEATURE_NAME}` with extracted feature name
   - Replace `{BRANCH_NAME}` with final branch name
   - Replace `{DATE}` with current date
   - Parse description into user stories and functional requirements
   - Mark ambiguous items with `[NEEDS CLARIFICATION: specific question]`

### Placeholder Extraction Guidelines
- **{FEATURE_NAME}**: Extract main subject/noun from description, convert to Title Case. If description is vague, ask "What should this feature be called?"
- **{USER_STORIES}**: Generate stories using "As a [user], I want [goal] so that [benefit]" format
- **{FUNCTIONAL_REQUIREMENTS}**: Create testable statements starting with "The system shall/must/should"

9. **Save as**: `specs/{branch}/spec.md`
10. **Response**: "Spec created at specs/{branch}/spec.md. Review and use /plan next."

## Error Handling

- **No git repository**: Ask "No git repository found. Initialize git? (y/n)"
  - If **yes**: Run `git init` and continue with "main" branch
  - If **no**: Continue with "unknown-branch" as branch name
- **Directory exists**: Ask "Directory specs/{branch}/ already exists. Overwrite existing specification? (y/n)"
- **Template not found**: Error "Template file .ccspec/templates/spec.md not found. Run 'npx ccspec init' to restore template files."
