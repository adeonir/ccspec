# ccspec

**ccspec (Claude Code Specification)** is a lightweight CLI tool that streamlines specification-driven development by integrating seamlessly with Claude Code. It generates structured templates and provides slash commands for creating specifications, technical plans, and implementation tasks interactively.

## How to Use

### 1. Initialize Your Project

```bash
npx ccspec init
```

### 2. Use Slash Commands in Claude Code

```
/spec Add user authentication with JWT tokens
/plan
/tasks
/implement
```

This generates:
- `specs/feature-auth/spec.md` - Feature specification
- `specs/feature-auth/plan.md` - Technical implementation plan
- `specs/feature-auth/tasks.md` - Implementation checklist with progress tracking

That's it! ccspec creates structured specs, plans, and tasks, then helps you implement them step-by-step.

---

## Documentation

**[Complete Guide](https://github.com/adeonir/ccspec/blob/main/GUIDE.md)** - Detailed workflow, examples, and configuration options

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Related Projects

- [Claude Code](https://claude.ai/code) - AI-powered development environment
- [Conventional Commits](https://conventionalcommits.org/) - Commit message specification
