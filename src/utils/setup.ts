import { agents } from '~/agents'
import { commands } from '~/commands'
import { templates } from '~/templates'
import { ensureDir, writeFile } from '~/utils/files'

export async function createDirectories(): Promise<void> {
  await ensureDir('.claude/commands')
  await ensureDir('.claude/agents')
  await ensureDir('.ccspec/templates')
}

export async function writeTemplates(): Promise<void> {
  await writeFile('.ccspec/templates/spec.md', templates.spec)
  await writeFile('.ccspec/templates/plan.md', templates.plan)
  await writeFile('.ccspec/templates/tasks.md', templates.tasks)
}

export async function writeAgents(): Promise<void> {
  await writeFile('.claude/agents/plan-agent.md', agents.plan)
  await writeFile('.claude/agents/tasks-agent.md', agents.tasks)
  await writeFile('.claude/agents/implement-agent.md', agents.implement)
}

export async function writeCommands(): Promise<void> {
  await writeFile('.claude/commands/spec.md', commands.spec)
  await writeFile('.claude/commands/clarify.md', commands.clarify)
  await writeFile('.claude/commands/plan.md', commands.plan)
  await writeFile('.claude/commands/tasks.md', commands.tasks)
  await writeFile('.claude/commands/implement.md', commands.implement)
}
