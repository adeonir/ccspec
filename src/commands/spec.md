# /spec Command

When user types `/spec [description]`:

## Execution Steps

1. **Get current git branch**: `git branch --show-current`
2. **Ask about branch usage**:
   - "Current branch: {current-branch}. Use this branch? (y/n)"
   - If **yes**: Continue with current branch
   - If **no**: Ask "Enter new branch name:" and create it with `git switch -c {new-branch}`
3. **Load configuration** (if exists): Read `.nanospecrc.json`
4. **Process branch name**:
   - Remove `branchPrefix` if present in config
   - Add auto-numbering if `autoNumbering: true` (scan existing folders)
5. **Create directory**: `{specDir}/{processed-branch}/`
6. **Copy template** from `.nanospec/templates/spec.md`
7. **Fill template** based on user description:
   - Replace `{FEATURE_NAME}` with extracted feature name
   - Replace `{BRANCH_NAME}` with final branch name
   - Replace `{DATE}` with current date
   - Parse description into user stories and requirements
   - Generate functional requirements from description
   - Mark ambiguous items with `[NEEDS CLARIFICATION: specific question]`
8. **Save as**: `{specDir}/{branch}/spec.md`
9. **Response**: "Spec created at {path}. Review and use /plan next"

## Config Defaults
- `branchPrefix`: "" (empty)
- `specDir`: "specs"
- `autoNumbering`: false

## Error Handling
- If not in git repository: Ask "No git repository found. Initialize git? (y/n)"
  - If **yes**: Run `git init` and continue with "main" branch
  - If **no**: Continue with "unknown-branch" as branch name
- If directory already exists: Ask to overwrite or append timestamp
- If template missing: Error with setup instructions

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