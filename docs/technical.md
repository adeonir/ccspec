# ccspec - Technical Documentation

## Objective

**ccspec** is a lightweight specification-driven development tool designed to streamline feature planning and implementation workflows. It provides structured templates for requirements, technical planning, and task management, with native integration for Claude Code through slash commands. The tool emphasizes simplicity, atomic commits, and interactive implementation to boost developer productivity.

## Technology Stack

### Language and Runtime
- **Node.js** (v22+)
- **TypeScript** (v5+)

### Main Dependencies
- **commander** - CLI framework for building command-line tools
- **chalk** - Terminal colors and styling for better user experience
- **fs-extra** - Enhanced file system operations with async/await support
- **inquirer** - Interactive command-line prompts
- **ora** - Terminal spinner for visual feedback

### Dev Dependencies
- **typescript** - Type-safe JavaScript development
- **@types/node** - TypeScript definitions for Node.js
- **@types/fs-extra** - TypeScript definitions for fs-extra
- **tsup** - Fast TypeScript bundler optimized for CLI tools
- **@biomejs/biome** - Fast formatter and linter for JavaScript/TypeScript
- **lefthook** - Git hooks manager for code quality automation

---

## Project Structure

```
ccspec/
├── src/
│   ├── index.ts           # Entry point & CLI setup
│   ├── cli/               # CLI command implementations
│   │   ├── init.ts        # Init command implementation
│   │   └── clear.ts       # Clear command implementation
│   ├── templates/         # Spec templates (Markdown files)
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   └── index.ts       # Imports all templates
│   ├── commands/          # Claude slash command instructions
│   │   ├── spec.md        # Instructions for /spec
│   │   ├── clarify.md     # Instructions for /clarify
│   │   ├── plan.md        # Instructions for /plan
│   │   ├── tasks.md       # Instructions for /tasks
│   │   ├── implement.md   # Instructions for /implement
│   │   └── index.ts       # Imports all instruction files
│   └── utils/
│       ├── banner.ts      # CLI banner display
│       └── files.ts       # File operations helpers
├── docs/                  # Technical documentation
├── dist/                  # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

---

## CLI Commands

### `ccspec init`
Creates ccspec base structure

**Actions:**
1. Check if `.ccspec/` already exists (offer to update if yes)
2. Create `.claude/commands/`
3. Create `.ccspec/templates/`
4. Write slash command instructions (markdown files) to `.claude/commands/`:
   - `spec.md` - Instructions for `/spec` command
   - `clarify.md` - Instructions for `/clarify` command
   - `plan.md` - Instructions for `/plan` command
   - `tasks.md` - Instructions for `/tasks` command
   - `implement.md` - Instructions for `/implement` command
5. Write spec templates to `.ccspec/templates/`:
   - `spec.md` - Feature specification template
   - `plan.md` - Technical plan template
   - `tasks.md` - Task list template
6. Display success message with next steps

### `ccspec clear`
Removes all ccspec files from project

**Actions:**
1. Check for existing ccspec files
2. Display list of files to be removed
3. Ask for confirmation
4. Remove `.ccspec/` directory
5. Remove ccspec command files from `.claude/commands/`
6. Remove `specs/` directory
7. Display success message

---

## Template System

ccspec uses a hybrid approach for templates and command instructions:

### Native Markdown Files
Templates and command instructions are written as native `.md` files for the best developer experience:
- Full Markdown syntax highlighting in editors
- Easy to edit and maintain
- Clear git diffs when templates change
- No escape characters or string formatting issues

### Bundled Into Executable
During build, these Markdown files are imported as text into TypeScript and bundled into the final executable:

```typescript
// src/templates/index.ts
import specTemplate from './spec.md?raw'
import planTemplate from './plan.md?raw'
import tasksTemplate from './tasks.md?raw'

export const templates = {
  spec: specTemplate,
  plan: planTemplate,
  tasks: tasksTemplate
}

// src/commands/index.ts
import specCommand from './spec.md?raw'
import clarifyCommand from './clarify.md?raw'
import planCommand from './plan.md?raw'
import tasksCommand from './tasks.md?raw'
import implementCommand from './implement.md?raw'

export const commands = {
  spec: specCommand,
  clarify: clarifyCommand,
  plan: planCommand,
  tasks: tasksCommand,
  implement: implementCommand
}
```

This approach gives us:
- Excellent developer experience with real Markdown files
- Single executable with no external dependencies
- Type-safe imports and bundling
- Clean distribution (only need the compiled CLI)

### Template Structure

Templates use `<instructions>` XML blocks to provide guidance to Claude during processing. These blocks are automatically removed from the final output.

**spec.md template:**
```markdown
# Feature Specification: {FEATURE_NAME}

**Branch**: {BRANCH_NAME}
**Created**: {DATE}
**Status**: Draft

<instructions>
- Focus on WHAT users need and WHY, not HOW to implement
- Mark unclear aspects with [NEEDS CLARIFICATION: specific question]
- User stories format: "As a [user], I want [goal] so that [benefit]"
- Requirements must be testable
</instructions>

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
```

Templates use placeholders (e.g., `{FEATURE_NAME}`, `{BRANCH_NAME}`) that are filled by slash commands.

### Slash Command Instructions

The CLI creates markdown instruction files in `.claude/commands/` with YAML frontmatter and semantic XML tags:

```markdown
<!-- .claude/commands/spec.md -->
---
description: Create feature specification from description or PRD file
argument-hint: [description] or @file.md
allowed-tools: Read, Write, Bash(git:*)
---

<objective>
Create a feature specification document from a user-provided description or PRD file.
</objective>

<context>
Verify ccspec initialization by reading in parallel:
- Templates: `.ccspec/templates/spec.md`, `.ccspec/templates/plan.md`, `.ccspec/templates/tasks.md`
- Commands: `.claude/commands/spec.md`, `.claude/commands/clarify.md`, `.claude/commands/plan.md`, `.claude/commands/tasks.md`, `.claude/commands/implement.md`

Parse `$ARGUMENTS` to determine input type:
- If empty: Ask for feature description
- If contains `@file.md` reference: Use expanded file content as PRD context
- If text only: Use as feature description
</context>

<process>
1. Process input from `$ARGUMENTS`
2. Get current git branch with `git branch --show-current`
3. Ask about branch usage
4. Create directory `specs/{branch}/`
5. Read template from `.ccspec/templates/spec.md`
6. Fill template placeholders
7. Remove `<instructions>` blocks from template
8. Save to `specs/{branch}/spec.md`
</process>

<success_criteria>
- Spec file created at `specs/{branch}/spec.md`
- All placeholders replaced with meaningful content
- Ambiguous items marked with `[NEEDS CLARIFICATION: question]`
</success_criteria>

<error_handling>
- **Not initialized**: "ccspec not initialized. Run 'npx ccspec init' first."
- **No git repo**: Ask to initialize git or use "unknown-branch"
- **Directory exists**: Ask to overwrite existing specification
</error_handling>
```

#### Frontmatter Fields:
- **description**: Brief command description (appears in Claude Code context)
- **allowed-tools**: Whitelist of permitted tools for security (e.g., `Read, Write, Bash(git:*)`)
- **argument-hint**: Hint for expected arguments (e.g., `[description]`)
- **$ARGUMENTS**: Variable that captures all arguments passed to the command

#### XML Tag Structure:
- **`<objective>`**: Clear statement of what the command accomplishes
- **`<context>`**: Prerequisites, validation checks, and input parsing
- **`<process>`**: Step-by-step execution instructions
- **`<success_criteria>`**: Expected outcomes and response format
- **`<error_handling>`**: Error scenarios and recovery actions

#### Implementation Details:
- **Tasks format**: Generated with checkboxes `- [ ] T### - Task description`
- **Progress tracking**: `/implement` updates `- [ ]` to `- [x]` as tasks complete
- **Interactive control**: `/implement --interactive` asks "Continue with T### - [task name]? (y/n)"
- **Batch mode**: `/implement` (default) executes all tasks without pauses

---

## Visual Output (Chalk)

### Success Messages
```typescript
console.log(chalk.blue.bold('\nInitializing ccspec...\n'));
console.log(chalk.green('✓') + ' Created .claude/commands/');
console.log(chalk.green('✓') + ' Created .ccspec/templates/');
console.log(chalk.green.bold('\nccspec initialized!\n'));
```

### Error Messages
```typescript
console.log(chalk.yellow.bold('\nccspec already initialized!\n'));
console.log(chalk.red.bold('\nError: ...\n'));
```

### Next Steps
```typescript
console.log(chalk.cyan('Next steps:'));
console.log('  1. ' + chalk.white('git switch -c feature/your-feature'));
console.log('  2. ' + chalk.white('Open Claude Code'));
console.log('  3. ' + chalk.white('Type /spec to get started\n'));
```

---

## Build and Distribution

### TypeScript Config (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "start": "node dist/index.js",
    "lint": "biome check --write src/",
    "check": "tsc --noEmit && biome ci src/"
  }
}
```

### Tsup Configuration (tsup.config.ts)
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  clean: true,
  minify: false,
  shims: true,
  loader: {
    '.md': 'text'  // Import .md files as text strings
  },
  banner: {
    js: '#!/usr/bin/env node'
  }
})
```

## Code Quality Tools

### Biome Configuration (biome.json)
```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "files": {
    "includes": ["src/**/*.ts"],
    "ignore": ["dist/**/*", "node_modules/**/*"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### Lefthook Configuration (lefthook.yml)
```yaml
pre-commit:
  commands:
    lint:
      run: pnpm lint

pre-push:
  commands:
    check:
      run: pnpm check
    build:
      run: pnpm build
```

### Publishing
```bash
# Build and publish to NPM
pnpm build
pnpm publish
```

---

## Usage

### Direct Execution (No Installation Required)
```bash
# Using npx (npm)
npx ccspec init

# Alternative package managers
pnpx ccspec init     # pnpm
bunx ccspec init     # bun
```

### Entry Point (src/index.ts)
```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './cli/init';
import { clear } from './cli/clear';

const program = new Command();

program
  .name('ccspec')
  .description('Simplified Spec-Driven Development for Claude Code')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize ccspec in current project')
  .action(init);

program
  .command('clear')
  .description('Remove all ccspec files')
  .action(clear);

program.parse();
```

---

## Execution Flow

### Developer executes:
```bash
npx ccspec init
```

### CLI executes:
1. Checks if `.ccspec/` already exists
2. Creates directory structure
3. Writes spec templates in `.ccspec/templates/`
4. Writes slash command instructions (markdown) in `.claude/commands/`
5. Shows success message

### Developer uses in Claude Code:
```
/spec Create authentication system
/clarify                # Resolve any ambiguous items
/plan
/tasks
/implement              # Batch mode
/implement --interactive # Interactive mode
```

### Claude Code executes:
1. Reads `.claude/commands/[command].md` (markdown instruction files)
2. Follows the instructions contained in the files
3. Creates/updates files in `specs/[branch]/` using templates from `.ccspec/templates/`
4. Updates checkboxes in tasks.md during implementation

---

## Validations and Errors

### Checks
- `.ccspec/` already exists → offer to update
- Not a git repository → warn user
- Write permissions → handle errors

### Error Handling
```typescript
try {
  await init();
} catch (error) {
  console.log(chalk.red.bold('\nError:\n'));
  console.log(chalk.red(error.message));
  process.exit(1);
}
```
