# ccspec

**ccspec (Claude Code Specification)** is a lightweight CLI tool that streamlines specification-driven development by integrating seamlessly with Claude Code. It generates structured templates and provides slash commands for creating specifications, technical plans, and implementation tasks with intelligent analysis and context validation.

## How to Use

### 1. Initialize Your Project

```bash
npx ccspec init
```

### 2. Use Slash Commands in Claude Code

After running `ccspec init`, Claude Code will have access to these slash commands for structured development:

| Command         | Description                                                           |
|-----------------|-----------------------------------------------------------------------|
| `/spec`         | Define what you want to build with intelligent requirement analysis  |
| `/plan`         | Create technical plan with codebase research and validation          |
| `/tasks`        | Generate strategic task lists with dependency analysis               |
| `/implement`    | Execute tasks with progress tracking (batch or interactive modes)    |


**Smart Workflow**: Each command builds on the previous → `/spec` (requirements) → `/plan` (technical approach) → `/tasks` (implementation steps) → `/implement` (execution)

## Key Features

- **Intelligent Analysis**: Deep requirement and codebase analysis for optimal solutions
- **Context Validation**: Ensures consistency across specs, plans, and tasks
- **Codebase Integration**: Analyzes existing patterns from CLAUDE.md and project structure
- **Flexible Implementation**: Batch or interactive execution modes

> That's it! **ccspec** creates structured specs, plans, and tasks, then helps you implement them step-by-step.

---

## Documentation

**[Complete Guide](https://github.com/adeonir/ccspec/blob/main/GUIDE.md)** - Detailed workflow, examples, and configuration options

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Acknowledgements

This project is inspired by [Spec Kit](https://github.com/github/spec-kit).
