# /plan Command

When user types `/plan`:

## Gate Check: Spec Validation

1. **Verify spec exists**: Check `specs/{branch}/spec.md`
   - If not found: Error "spec file not found. Run /spec first"
2. **Validate spec completeness**: Check spec has required sections
   - Verify spec contains `## Overview` section
   - Verify spec contains `## User Stories` or `## Requirements` section
   - If missing: Error "spec incomplete. Ensure spec has Overview and User Stories sections"
3. **Check for unresolved items**: Scan spec for `[NEEDS CLARIFICATION]` items
   - If found: List unresolved items and ask "Spec has unresolved clarifications. Continue anyway? (y/n)"
   - If user chooses 'n': Stop with message "Resolve clarifications in spec.md before proceeding"

## Execution Steps

1. **Load spec content**: Read and parse the specification
2. **Enhanced CLAUDE.md Integration**: Intelligent parsing of project guidelines and context extraction
   - **Read CLAUDE.md content**: Load full file content for analysis
   - **Smart pattern recognition**:
     * **Package management commands**: Scan for dependency installation and management patterns
     * **Build and compilation**: Identify build systems, bundlers, and compilation processes
     * **Testing approaches**: Detect testing frameworks, test runners, and testing methodologies
     * **Code quality tools**: Find linting, formatting, and static analysis tool usage
     * **Runtime platforms**: Identify programming languages and runtime environments
     * **Framework patterns**: Detect web frameworks, API frameworks, and architectural libraries
   - **File references discovery**:
     * **Configuration files**: Find explicit file references in CLAUDE.md content
     * **Code blocks**: Extract file paths from code examples and configurations
     * **Documentation links**: Identify references to other project docs
   - **Architecture decisions extraction**:
     * **Directory patterns**: Understand project structure preferences
     * **Coding conventions**: Extract style and pattern guidelines
     * **Dependency choices**: Identify preferred libraries and tools
     * **Workflow requirements**: Parse development and deployment processes
   - **Context synthesis**: Combine all findings into structured project context for template adaptation
3. **Analyze codebase**:
   - Identify existing patterns and architecture
   - Find similar implementations
   - Detect framework and libraries in use
   - Understand project structure
4. **Copy template** from `.ccspec/templates/plan.md`
5. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
6. **Fill template** with intelligent context and research findings:
   - Replace `{FEATURE_NAME}` with spec feature name
   - Replace `{BRANCH_NAME}` with current branch
   - Replace `{DATE}` with current date
   - Replace `{SPEC_SUMMARY}` with extracted summary from spec
   - Replace `{CODEBASE_RESEARCH}` with enhanced findings from CLAUDE.md + codebase analysis
   - Replace `{PATTERNS}` with project patterns from CLAUDE.md + identified code patterns
   - Replace `{ARCHITECTURE}` with architectural decisions from CLAUDE.md context
   - Replace `{TECHNICAL_DECISIONS}` with approach details informed by project guidelines
   - Replace `{IMPLEMENTATION_STEPS}` with context-aware steps using correct commands/tools
   - Replace `{DEPENDENCIES}` with dependencies using detected package manager and preferences
   - Replace `{RISKS}` with risks considering project constraints and guidelines
7. **Resolve ambiguities**: Address any `[NEEDS CLARIFICATION]` items from spec
8. **Save as**: `specs/{branch}/plan.md`
9. **Response**: "Technical plan created at {path}. Use /tasks next"

## Research Areas
### Enhanced CLAUDE.md Context
- **Package management**: Dependency installation and management approach
- **Runtime environment**: Platform and language-specific configurations
- **Framework choices**: Web frameworks, API frameworks, and architectural libraries
- **Testing methodology**: Testing approaches, coverage requirements, and quality standards
- **Code quality**: Linting, formatting, and static analysis standards
- **Build systems**: Build processes, compilation, and deployment configurations
- **Architecture patterns**: Directory structure, design patterns, and project organization
- **Team conventions**: Coding standards, commit patterns, and development workflow
- **Configuration management**: Referenced files and environment-specific settings

### Codebase Analysis
- **Implementation patterns**: Existing code structure and architectural patterns
- **Framework conventions**: Framework-specific patterns and best practices in use
- **Data layer**: Database schemas, ORM patterns, data access layers
- **API design**: REST/GraphQL patterns, middleware, authentication approaches
- **Testing structure**: Test organization, mocking patterns, integration approaches
- **Infrastructure**: Docker, CI/CD, deployment, and environment configurations

## Example Output
```
Technical plan created at specs/feature-auth/plan.md
Plan includes codebase research and technical approach. Use /tasks when ready to generate implementation tasks.
```
