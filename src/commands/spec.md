# /spec Command

When user types `/spec [description]`:

## Gate Check: Initialization

1. **Verify ccspec initialization**: Check if `.ccspec/` directory exists
   - If not found: Error "ccspec not initialized in this project. Run 'npx ccspec init' in the project root to set up ccspec templates and commands."
2. **Verify templates**: Check if `.ccspec/templates/` contains required templates
   - Check for `spec.md`, `plan.md`, `tasks.md` template files
   - If any missing: Error "Template files missing. Run 'npx ccspec init' to restore the required template files (spec.md, plan.md, tasks.md)."

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
   - **DO NOT** attempt to read `.ccspecrc.json` unless you verify it exists first
   - Use Glob tool to check for `.ccspecrc.json` file existence
   - Only if file exists, then read it with Read tool
   - **Validate JSON structure**: If file exists but contains invalid JSON, show warning "Invalid .ccspecrc.json format, using defaults" and use defaults
   - **Check required fields**: Config should only contain `branchPrefix` (string) and `autoNumbering` (boolean)
   - If file doesn't exist, use these defaults: `{"branchPrefix": "", "autoNumbering": false}`
   - **NEVER** show "Error reading file" messages for missing config
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
   - Parse description into user stories and requirements
   - Generate functional requirements from description
   - Mark ambiguous items with `[NEEDS CLARIFICATION: specific question]`

### Placeholder Extraction Guidelines
- **{FEATURE_NAME}**: Extract main subject/noun from description, convert to Title Case. If description is vague, ask "What should this feature be called?"
- **{USER_STORIES}**: Generate stories using "As a [user], I want [goal] so that [benefit]" format
- **{FUNCTIONAL_REQUIREMENTS}**: Create testable statements starting with "The system shall/must/should"
9. **Save as**: `specs/{branch}/spec.md`
10. **Response**: "Spec created at specs/{branch}/spec.md. Review and use /plan next."

## Config Defaults
- `branchPrefix`: "" (empty)
- `autoNumbering`: false

## Error Handling
- If not in git repository: Ask "No git repository found. Initialize git? (y/n)"
  - If **yes**: Run `git init` and continue with "main" branch
  - If **no**: Continue with "unknown-branch" as branch name
- If directory already exists: Ask "Directory specs/{branch}/ already exists. Overwrite existing specification? (y/n)"
- If template not found: Error "Template file .ccspec/templates/spec.md not found. Run 'npx ccspec init' to restore template files."

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
