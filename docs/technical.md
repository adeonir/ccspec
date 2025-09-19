# ccspec - Technical Planning

## Technology Stack

### Language and Runtime
- **Node.js** (v22+)
- **TypeScript** (v5+)

### Main Dependencies
- **commander** - CLI framework for building command-line tools
- **chalk** - Terminal colors and styling for better user experience
- **fs-extra** - Enhanced file system operations with async/await support

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
│   │   └── init.ts        # Init command implementation
│   ├── templates/         # Spec templates (Markdown files)
│   │   ├── spec.md
│   │   ├── plan.md
│   │   ├── tasks.md
│   │   └── index.ts       # Imports all templates
│   ├── commands/          # Claude slash command instructions
│   │   ├── spec.md        # Instructions for /spec
│   │   ├── plan.md        # Instructions for /plan
│   │   ├── tasks.md       # Instructions for /tasks
│   │   ├── implement.md   # Instructions for /implement
│   │   └── index.ts       # Imports all instruction files
│   └── utils/
│       └── files.ts       # File operations helpers
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
1. Check if `.ccspec/` already exists (warn if yes)
2. Create `.claude/commands/`
3. Create `.ccspec/templates/`
4. Write slash command instructions (markdown files) to `.claude/commands/`:
   - `spec.md` - Instructions for `/spec` command
   - `plan.md` - Instructions for `/plan` command
   - `tasks.md` - Instructions for `/tasks` command
   - `implement.md` - Instructions for `/implement` command
5. Write spec templates to `.ccspec/templates/`:
   - `spec.md` - Feature specification template
   - `plan.md` - Technical plan template
   - `tasks.md` - Task list template
6. Display success message with next steps

### `ccspec init --config`
Same as `init` + create `.ccspecrc.json`

**Additional actions:**
7. Write `.ccspecrc.json` with default configuration values

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
import planCommand from './plan.md?raw'
import tasksCommand from './tasks.md?raw'
import implementCommand from './implement.md?raw'

export const instructions = {
  spec: specCommand,
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

### Slash Command Instructions (Markdown Files)

The CLI will create markdown instruction files in `.claude/commands/` that Claude Code reads:

```markdown
<!-- .claude/commands/spec.md -->
# /spec Command

When user types `/spec [description]`:

## Execution Steps:
1. Check for git repository: `git status` or similar
2. If no git repository → Ask "Initialize git? (y/n)"
   - If yes → run `git init` and use "main" branch
   - If no → continue with "unknown-branch"
3. If git exists → Get current branch: `git branch --show-current`
4. Ask about branch usage: "Use current branch? (y/n)"
5. If no → ask for new branch name and create with `git switch -c`
6. Load `.ccspecrc.json` if exists (read config)
7. Process branch name:
   - Remove `branchPrefix` if present in config
   - Add auto-numbering if `autoNumbering: true` (scan existing folders)
8. Create directory: `{specDir}/{processed-branch}/`
9. Copy template from `.ccspec/templates/spec.md`
10. Fill template based on user description:
    - Parse feature name
    - Generate user stories from description
    - Create functional requirements
    - Mark `[NEEDS CLARIFICATION]` for ambiguous items
11. Save as: `{specDir}/{branch}/spec.md`
12. Response: "Spec created at {path}. Review and use /plan next"

## Config Defaults:
- branchPrefix: "" (empty)
- specDir: "specs"
- autoNumbering: false
```

Similar instruction files will be created for `/plan`, `/tasks`, and `/implement` commands.

#### Key Implementation Details:
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

## Configuration (.ccspecrc.json)

### Schema TypeScript
```typescript
interface ccspecConfig {
  branchPrefix?: string;      // default: ''
  specDir?: string;           // default: 'specs'
  autoNumbering?: boolean;    // default: false
}
```

### Generated Default File
```json
{
  "specDir": "specs"                    // Folder name for specifications
  // "branchPrefix": "feature/",        // Prefix to remove from branch names
  // "autoNumbering": false             // Add 001-, 002- numbering to folders
}
```

---

## Function Implementation

### Main Function (init.ts)
```typescript
export async function init(options: { config?: boolean }) {
  // 1. Check if already initialized
  if (fs.existsSync('.ccspec')) {
    console.log(chalk.yellow('.ccspec/ already exists'));
    return;
  }

  console.log(chalk.blue.bold('\nInitializing ccspec...\n'));

  // 2. Create directories
  await createDirectories();

  // 3. Write templates
  await writeTemplates();

  // 4. Write command files
  await writeCommands();

  // 5. Optionally create config
  if (options.config) {
    await createConfig();
  }

  // 6. Success message
  printSuccess();
}
```

### Helpers (utils/files.ts)
```typescript
export async function ensureDir(path: string) {
  await fs.ensureDir(path);
  console.log(chalk.green('✓') + ` Created ${path}`);
}

export async function writeFile(path: string, content: string) {
  await fs.writeFile(path, content, 'utf8');
  console.log(chalk.green('✓') + ` Added ${path}`);
}
```

---

## Build and Distribution

### TypeScript Config (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
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
  format: ['cjs'],
  target: 'node18',
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
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
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
      "recommended": true,
      "style": {
        "noNonNullAssertion": "warn",
        "useConst": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
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
npx ccspec init --config

# Alternative package managers
pnpx ccspec init     # pnpm
bunx ccspec init     # bun
```

### Entry Point (src/index.ts)
```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './cli/init';

const program = new Command();

program
  .name('ccspec')
  .description('Simplified Spec-Driven Development for Claude Code')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize ccspec in current project')
  .option('--config', 'Create .ccspecrc.json configuration file')
  .action(init);

program.parse();
```

---

## Execution Flow

### Developer executes:
```bash
npx ccspec init --config
```

### CLI executes:
1. Checks if `.ccspec/` already exists
2. Creates directory structure
3. Writes spec templates in `.ccspec/templates/`
4. Writes slash command instructions (markdown) in `.claude/commands/`
5. Creates `.ccspecrc.json` (if --config flag used)
6. Shows success message

### Developer uses in Claude Code:
```
/spec Create authentication system
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
- `.ccspec/` already exists → warn user
- Not a git repository → warn user
- Write permissions → handle errors

### Error Handling
```typescript
try {
  await init(options);
} catch (error) {
  console.log(chalk.red.bold('\nError:\n'));
  console.log(chalk.red(error.message));
  process.exit(1);
}
```

---

## Next Implementation Steps

1. Initial npm project setup
2. Implement basic `init` command
3. Add native Markdown templates with hybrid import system
4. Test with Claude Code
5. Refine messages and UX
6. Publish alpha version
7. Collect feedback and iterate
