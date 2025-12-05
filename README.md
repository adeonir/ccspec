# ccspec

> **This CLI has been deprecated.** The project has been migrated to a Claude Code plugin with improved features and better integration. Please use the new plugin instead:
>
> **[spec-driven plugin](https://github.com/adeonir/claude-code-plugins/tree/main/plugins/spec-driven)**

---

**ccspec (Claude Code Specification)** is a lightweight CLI tool that streamlines specification-driven development by integrating seamlessly with Claude Code. It generates structured templates and provides slash commands for creating specifications, technical plans, and implementation tasks with intelligent analysis and context validation.

## Migration to Plugin

The functionality of this CLI has been moved to a Claude Code plugin called `spec-driven`. For installation instructions and additional plugins, visit:

**[claude-code-plugins](https://github.com/adeonir/claude-code-plugins)**

---

## Legacy Documentation

The information below is kept for reference purposes only. This CLI will no longer receive updates.

## How to Use

### 1. Initialize Your Project

```bash
npx ccspec init
```

### 2. Use Slash Commands in Claude Code

After running `ccspec init`, Claude Code will have access to these slash commands for structured development:

| Command             | Description                                                           |
|---------------------|-----------------------------------------------------------------------|
| `/spec:create`      | Define what you want to build with intelligent requirement analysis  |
| `/spec:clarify`     | Resolve ambiguous items in the specification interactively           |
| `/spec:plan`        | Create technical plan via plan-agent subagent                        |
| `/spec:tasks`       | Generate task lists via tasks-agent subagent                         |
| `/spec:implement`   | Execute tasks via implement-agent (supports T001 or T001-T005 scope) |


**Smart Workflow**: `/spec:create` (requirements) -> `/spec:clarify` (resolve ambiguities) -> `/spec:plan` (technical approach) -> `/spec:tasks` (implementation steps) -> `/spec:implement` (execution)

## Key Features

- **Subagents**: Dedicated agents (plan-agent, tasks-agent, implement-agent) with isolated context
- **Intelligent Analysis**: Deep requirement and codebase analysis for optimal solutions
- **Context Validation**: Ensures consistency across specs, plans, and tasks
- **Codebase Integration**: Analyzes existing patterns from CLAUDE.md and project structure
- **Flexible Execution**: Execute all tasks, a single task, or a range (T001-T005)

> That's it! **ccspec** creates structured specs, plans, and tasks, then helps you implement them step-by-step.

---

## Documentation

**[Complete Guide](https://github.com/adeonir/ccspec/blob/main/GUIDE.md)** - Detailed workflow, examples, and configuration options

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Acknowledgements

This project is inspired by [Spec Kit](https://github.com/github/spec-kit).
