# /spec Command

When user types `/spec [description]`:

## Gate Check: Initialization

1. **Verify ccspec initialization**: Use `Read` tool to check if all required files exist. Claude Code can call multiple Read tools in parallel for better performance:
   - Templates: `.ccspec/templates/spec.md`, `.ccspec/templates/plan.md`, `.ccspec/templates/tasks.md`
   - Commands: `.claude/commands/spec.md`, `.claude/commands/plan.md`, `.claude/commands/tasks.md`, `.claude/commands/implement.md`
   - If any file not found: Error "ccspec not initialized or incomplete. Run 'npx ccspec init' in the project root to set up or update all required templates and commands."

## Input Validation

1. **Check for description parameter**:
   - If no description provided: Ask "What feature would you like to specify? Please describe the functionality you want to implement:"
   - Wait for user response before proceeding

## Execution Steps

1. **Get current git branch**: `git branch --show-current`
2. **Ask about branch usage**:
   - "Current branch: {current-branch}. Use this branch? (y/n)"
   - If **yes**: Continue with current branch
   - If **no**: Ask "Enter new branch name:" and create it with `git switch -c {new-branch}`
3. **Load configuration**:
   - Try to read `.ccspecrc.json` with `Read` tool
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
   Use think to analyze the user description and extract requirements:
   - Understand the core functionality and scope
   - Identify user roles and workflows
   - Generate appropriate user stories following "As a [user], I want [goal] so that [benefit]" format
   - Create testable functional requirements
   - Spot ambiguous areas that need clarification

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
- If not in git repository: Ask "No git repository found. Initialize git? (y/n)"
  - If **yes**: Run `git init` and continue with "main" branch
  - If **no**: Continue with "unknown-branch" as branch name
- If directory already exists: Ask "Directory specs/{branch}/ already exists. Overwrite existing specification? (y/n)"
- If template not found: Error "Template file .ccspec/templates/spec.md not found. Run 'npx ccspec init' to restore template files."

## Error Recovery

### Initialization Errors
- **ccspec not initialized**: Run `npx ccspec init` in project root to set up templates and commands
- **Missing templates**: Run `npx ccspec init` to restore template files (spec.md, plan.md, tasks.md)

### Git Repository Errors
- **No git repository**: Choose "Initialize git? (y/n)" - Yes creates repo, No continues with 'unknown-branch'
- **Branch creation fails**: Verify branch name is valid (no spaces, special characters)

### Directory Conflicts
- **Directory exists**: Choose "Overwrite existing specification? (y/n)" - Yes replaces, No cancels operation
- **Permission denied**: Check write permissions in project directory

### Template Processing Errors
- **Template not found**: Run `npx ccspec init` to restore missing template files
- **Placeholder extraction fails**: Provide clearer feature description or specify feature name when prompted

## Example Interactions

### With existing git repository:
```
Current branch: main. Use this branch? (y/n): n
Enter new branch name: feature/jwt-auth
Switched to new branch 'feature/jwt-auth'

Spec created at specs/feature-jwt-auth/spec.md
Review the specification and use /plan when ready for technical planning.
```

### Without git repository:
```
No git repository found. Initialize git? (y/n): y
Initialized empty Git repository in /path/to/project/.git/
Using branch: main

Spec created at specs/main/spec.md
Review the specification and use /plan when ready for technical planning.
```
