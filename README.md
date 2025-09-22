# ccspec

**ccspec (Claude Code Specification)** is a lightweight CLI tool that streamlines specification-driven development by integrating seamlessly with Claude Code. It generates structured templates and provides slash commands for creating specifications, technical plans, and implementation tasks interactively.

## How to Use

### 1. Initialize Your Project

```bash
npx ccspec init
```

### 2. Use Slash Commands in Claude Code

After running `ccspec init`, Claude Code will have access to these slash commands for structured development:

| Command         | Description                                                           |
|-----------------|-----------------------------------------------------------------------|
| `/spec`         | Define what you want to build (requirements and user stories)        |
| `/plan`         | Create technical implementation plan by analyzing CLAUDE.md and codebase |
| `/tasks`        | Generate actionable task lists for implementation                     |
| `/implement`    | Execute all tasks (batch mode) or step-by-step (interactive mode)    |


**Workflow**: Follow the commands in sequence → `/spec` → `/plan` → `/tasks` → `/implement`

> That's it! **ccspec** creates structured specs, plans, and tasks, then helps you implement them step-by-step.

---

## Documentation

**[Complete Guide](https://github.com/adeonir/ccspec/blob/main/GUIDE.md)** - Detailed workflow, examples, and configuration options

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Acknowledgements

This project is inspired by [Spec Kit](https://github.com/github/spec-kit).
