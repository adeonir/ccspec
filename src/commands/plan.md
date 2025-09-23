# /plan Command

When user types `/plan`:

## Gate Check: Context Validation & Spec Analysis

1. **Verify spec exists**: Check `specs/{branch}/spec.md`
   - If not found: Error "No specification found at specs/{branch}/spec.md. Run /spec first to create a feature specification."
2. **Validate spec completeness**: Check spec has required sections
   - Verify spec contains `## Overview` section
   - Verify spec contains `## User Stories` or `## Requirements` section
   - If missing: Error "Specification incomplete. The spec.md file must contain '## Overview' and '## User Stories' sections. Please complete the specification first."
3. **Context consistency validation**:
   - Verify git branch matches spec branch name from file header
   - Ensure spec directory structure aligns with current working state
4. **Check for unresolved items**: Scan spec for `[NEEDS CLARIFICATION]` items
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
   Use think to structure your codebase analysis:
   - Review existing patterns and architecture
   - Evaluate how the new feature integrates with current systems
   - Consider framework conventions and project standards
   - Identify similar implementations for reference
   - Assess technical constraints and opportunities
4. **Copy template** from `.ccspec/templates/plan.md`
5. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
6. **Fill template** with intelligent context and research findings:
   Use ultrathink for complex technical decisions and architectural trade-offs:
   - Evaluate multiple implementation approaches
   - Consider technical risks and mitigation strategies
   - Assess integration complexity and dependencies
   - Plan testing strategy and quality assurance
   - Review scalability and performance implications

   Replace template placeholders:
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
9. **Response**: "Plan created at specs/{branch}/plan.md. Review and use /tasks next."

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
