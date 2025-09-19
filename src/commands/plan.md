# /plan Command

When user types `/plan`:

## Execution Steps

1. **Verify spec exists**: Check `specs/{branch}/spec.md`
   - If not found: Error "No spec found. Run /spec first"
2. **Load spec content**: Read and parse the specification
3. **Read project guidelines**: Check for CLAUDE.md file and read project-specific conventions and guidelines
4. **Analyze codebase**:
   - Identify existing patterns and architecture
   - Find similar implementations
   - Detect framework and libraries in use
   - Understand project structure
5. **Copy template** from `.nanospec/templates/plan.md`
6. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
7. **Fill template** with research findings:
   - Replace `{FEATURE_NAME}` with spec feature name
   - Replace `{BRANCH_NAME}` with current branch
   - Replace `{DATE}` with current date
   - Replace `{SPEC_SUMMARY}` with extracted summary from spec
   - Replace `{CODEBASE_RESEARCH}` with plan mode findings
   - Replace `{PATTERNS}` with identified patterns
   - Replace `{ARCHITECTURE}` with architectural decisions
   - Replace `{TECHNICAL_DECISIONS}` with approach details
   - Replace `{IMPLEMENTATION_STEPS}` with step-by-step plan
   - Replace `{DEPENDENCIES}` with required dependencies
   - Replace `{RISKS}` with identified risks
8. **Resolve ambiguities**: Address any `[NEEDS CLARIFICATION]` items from spec
9. **Save as**: `specs/{branch}/plan.md`
10. **Response**: "Technical plan created at {path}. Use /tasks next"

## Research Areas
- Project guidelines and conventions (CLAUDE.md)
- Existing code patterns to follow
- Framework conventions and best practices
- Database schema and models (if applicable)
- API patterns and middleware
- Testing strategies used in the project
- Build and deployment processes

## Example Output
```
Technical plan created at specs/feature-auth/plan.md
Plan includes codebase research and technical approach. Use /tasks when ready to generate implementation tasks.
```
