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
3. **Project research caching**:
   - Try to read `specs/research.md` with `Read` tool
   - **If file doesn't exist**: Perform full project research and save to `specs/research.md`:
     * Analyze project structure and architecture
     * Identify frameworks, tools, and technologies
     * Document key patterns and conventions
     * Save research for reuse by future /plan commands
   - **If file exists**: Use cached research to avoid repeating full codebase analysis
   - **Update detection**: If major changes detected (new dependencies, structural changes), update the research file
4. **Feature-specific codebase analysis**:
   Use think to structure your codebase analysis. Analyze the codebase using Grep to find patterns, then Read specific files found. Prefer Glob for file discovery over multiple Grep calls:
   - **If research cached**: Use cached research from `specs/research.md` as foundation, focus on feature-specific analysis
   - **If no cached research**: Perform comprehensive analysis and include in `specs/research.md`
   - Review existing patterns and architecture
   - Evaluate how the new feature integrates with current systems
   - Consider framework conventions and project standards
   - Identify similar implementations for reference
   - Assess technical constraints and opportunities
5. **Copy template** from `.ccspec/templates/plan.md`
6. **Remove instruction sections**: Delete all content between `<!--` and `-->` comments
7. **Fill template** with intelligent context and research findings:
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
   - Replace `{CODEBASE_RESEARCH}` with cached research from specs/research.md + feature-specific analysis
   - Replace `{PATTERNS}` with project patterns from CLAUDE.md + identified code patterns
   - Replace `{ARCHITECTURE}` with architectural decisions from CLAUDE.md context
   - Replace `{TECHNICAL_DECISIONS}` with approach details informed by project guidelines
   - Replace `{IMPLEMENTATION_STEPS}` with context-aware steps using correct commands/tools
   - Replace `{DEPENDENCIES}` with dependencies using detected package manager and preferences
   - Replace `{RISKS}` with risks considering project constraints and guidelines
8. **Resolve ambiguities**: Address any `[NEEDS CLARIFICATION]` items from spec
9. **Save as**: `specs/{branch}/plan.md`
10. **Response**: "Plan created at specs/{branch}/plan.md. Review and use /tasks next."

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

## Error Recovery

### Specification Errors
- **No spec found**: Run `/spec [description]` first to create feature specification
- **Incomplete spec**: Add missing sections (Overview, User Stories) to spec.md and rerun
- **Invalid spec format**: Check spec.md has proper markdown structure with required headings

### Context Validation Errors
- **Branch mismatch**: Switch to correct branch or update spec.md branch reference
- **Directory structure misaligned**: Verify specs/{branch}/ directory structure is correct

### Clarification Handling
- **Unresolved clarifications**:
  - Choose "Continue anyway (y)" to proceed with assumptions documented as risks
  - Choose "No (n)" to resolve clarifications in spec.md first, then rerun `/plan`
- **How to resolve**: Edit spec.md, replace `[NEEDS CLARIFICATION: question]` with specific requirements

### Template and Analysis Errors
- **Template missing**: Run `npx ccspec init` to restore plan.md template
- **CLAUDE.md not found**: Continue without project-specific patterns (plan will use generic approaches)
- **Codebase analysis fails**: Ensure project directory is accessible and contains source code

### Research Failures
- **Pattern detection fails**: Plan will use generic implementation approaches
- **Framework identification fails**: Manually specify framework in plan.md after generation

## Example Output
```
Technical plan created at specs/feature-auth/plan.md
Plan includes codebase research and technical approach. Use /tasks when ready to generate implementation tasks.
```
