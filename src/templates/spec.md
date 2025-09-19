# Feature Specification: {FEATURE_NAME}

**Branch**: {BRANCH_NAME}
**Created**: {DATE}
**Status**: Draft

## Execution Flow
```
1. Parse user description
2. Extract key concepts (actors, actions, data, constraints)
3. Mark unclear aspects with [NEEDS CLARIFICATION: question]
4. Generate user stories
5. Create functional requirements (must be testable)
6. Identify entities if data is involved
7. Run review checklist
```

## Guidelines
- Focus on WHAT users need and WHY
- Avoid HOW to implement (no tech stack, APIs, code structure)
- Mark all ambiguities with [NEEDS CLARIFICATION: specific question]
- Remove optional sections that don't apply

## Overview
{FEATURE_DESCRIPTION}

## User Stories
{USER_STORIES}

## Functional Requirements
{FUNCTIONAL_REQUIREMENTS}

## Acceptance Criteria
{ACCEPTANCE_CRITERIA}

## Key Entities (optional)
{ENTITIES}

## Review Checklist
- [ ] All requirements are testable
- [ ] No implementation details included
- [ ] Ambiguities clearly marked
- [ ] User value is defined

## Common Ambiguities to Check
- User types and permissions
- Data retention/deletion policies
- Performance targets and scale
- Error handling behaviors
- Integration requirements
- Security/compliance needs
