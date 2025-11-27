---
description: Generate technical plan from specification
allowed-tools: Read, Write, Grep, Glob
---

<objective>
Generate a technical implementation plan from the feature specification. This command analyzes the codebase, extracts project context from CLAUDE.md, caches research findings, and produces a detailed plan with technical decisions, implementation steps, and risk assessment.
</objective>

<context>
Read in parallel to validate prerequisites:
- `specs/{branch}/spec.md` - must exist with `## Overview` and `## User Stories` sections
- `CLAUDE.md` - project guidelines and patterns
- `specs/research.md` - cached project research (if exists)
- `.ccspec/templates/plan.md` - plan template

Check for `[NEEDS CLARIFICATION]` items in spec. If found, list them and ask: "Spec has unresolved clarifications. Continue anyway? (y/n)"
</context>

<process>
1. Load and parse `specs/{branch}/spec.md`
2. Parse CLAUDE.md for project context:
   - Package management patterns
   - Build systems and bundlers
   - Testing frameworks and methodology
   - Code quality tools (linting, formatting)
   - Framework patterns and conventions
   - Directory structure preferences
3. Handle project research cache (`specs/research.md`):
   - If missing: Perform full codebase analysis and save
   - If exists: Use cached research, update if major changes detected
4. Perform feature-specific codebase analysis:
   - Use Glob for file discovery, Grep for pattern search
   - Identify integration points and affected components
   - Find similar implementations for reference
   - Assess technical constraints
5. Read template from `.ccspec/templates/plan.md`
6. Fill template placeholders:
   - `{FEATURE_NAME}` - from spec
   - `{BRANCH_NAME}` - current branch
   - `{DATE}` - current date
   - `{SPEC_SUMMARY}` - extracted from spec overview
   - `{PROJECT_CONTEXT}` - from specs/research.md
   - `{FEATURE_ANALYSIS}` - feature-specific research
   - `{TECHNICAL_DECISIONS}` - approach informed by project guidelines
   - `{IMPLEMENTATION_STEPS}` - context-aware steps
   - `{DEPENDENCIES}` - using detected package manager
   - `{RISKS}` - considering project constraints
7. Remove `<instructions>` blocks from template
8. Save to `specs/{branch}/plan.md`
</process>

<research_areas>
**From CLAUDE.md:**
- Package management and runtime environment
- Framework choices and architecture patterns
- Testing methodology and coverage requirements
- Code quality standards and build systems
- Team conventions and workflow

**From Codebase:**
- Implementation patterns and architecture
- Data layer (schemas, ORM, data access)
- API design (REST/GraphQL, middleware, auth)
- Testing structure and mocking patterns
- Infrastructure (Docker, CI/CD, deployment)
</research_areas>

<success_criteria>
- Plan file created at `specs/{branch}/plan.md`
- Project context populated from CLAUDE.md analysis
- Research cached in `specs/research.md`
- All `[NEEDS CLARIFICATION]` items addressed or documented as risks
- Response: "Plan created at specs/{branch}/plan.md. Review and use /tasks next."
</success_criteria>

<error_handling>
- **No spec found**: "Run /spec first to create feature specification."
- **Incomplete spec**: "Add missing sections (Overview, User Stories) to spec.md."
- **Branch mismatch**: "Switch to correct branch or update spec.md."
- **Template missing**: "Run 'npx ccspec init' to restore templates."
- **No CLAUDE.md**: Continue with generic approaches (no project-specific patterns).
</error_handling>
