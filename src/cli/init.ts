import boxen from 'boxen'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { agents } from '../agents'
import { commands } from '../commands'
import { templates } from '../templates'
import { printBanner } from '../utils/banner'
import { ensureDir, fileExists, writeFile } from '../utils/files'

export async function init(): Promise<void> {
  try {
    printBanner()

    let isUpdate = false

    if (fileExists('.ccspec')) {
      const { update } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'update',
          message: `${chalk.bold('ccspec')} already initialized. Update templates and commands?`,
          default: true,
        },
      ])

      if (!update) {
        console.log(chalk.gray('Update cancelled.\n'))
        return
      }

      isUpdate = true
    } else {
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: `Initialize ${chalk.bold('ccspec')} in this directory?`,
          default: true,
        },
      ])

      if (!proceed) {
        console.log(chalk.gray('Initialization cancelled.\n'))
        return
      }
    }

    const spinner = ora('Creating directories...').start()
    await createDirectories()
    spinner.text = 'Writing templates...'
    await writeTemplates()
    spinner.text = 'Writing agents...'
    await writeAgents()
    spinner.text = 'Writing commands...'
    await writeCommands()

    const successMessage = isUpdate
      ? `✓ ${chalk.bold('ccspec')} updated successfully!`
      : `✓ ${chalk.bold('ccspec')} initialized successfully!`

    spinner.succeed(chalk.green(successMessage))
    printSuccess()
  } catch (error) {
    ora().fail(chalk.red('✗ Initialization failed'))
    console.log(chalk.red.bold('\nError:'))
    console.log(chalk.red(`   ${error instanceof Error ? error.message : String(error)}\n`))
    process.exit(1)
  }
}

async function createDirectories(): Promise<void> {
  await ensureDir('.claude/commands')
  await ensureDir('.claude/agents')
  await ensureDir('.ccspec/templates')
}

async function writeTemplates(): Promise<void> {
  await writeFile('.ccspec/templates/spec.md', templates.spec)
  await writeFile('.ccspec/templates/plan.md', templates.plan)
  await writeFile('.ccspec/templates/tasks.md', templates.tasks)
}

async function writeAgents(): Promise<void> {
  await writeFile('.claude/agents/plan-agent.md', agents.plan)
  await writeFile('.claude/agents/tasks-agent.md', agents.tasks)
  await writeFile('.claude/agents/implement-agent.md', agents.implement)
}

async function writeCommands(): Promise<void> {
  await writeFile('.claude/commands/spec.md', commands.spec)
  await writeFile('.claude/commands/clarify.md', commands.clarify)
  await writeFile('.claude/commands/plan.md', commands.plan)
  await writeFile('.claude/commands/tasks.md', commands.tasks)
  await writeFile('.claude/commands/implement.md', commands.implement)
}

function printSuccess(): void {
  const nextSteps = `1. Open Claude Code
2. Type ${chalk.blue.bold('/spec')} to get started
3. Follow: ${chalk.gray.bold('/spec')} → ${chalk.gray.bold('/clarify')} → ${chalk.gray.bold('/plan')} → ${chalk.gray.bold('/tasks')} → ${chalk.gray.bold('/implement')}

${chalk.dim('Subagents installed for /plan, /tasks, and /implement')}`

  console.log(
    boxen(nextSteps, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'blue',
      title: 'Next Steps',
      titleAlignment: 'center',
      width: process.stdout.columns - 4,
    }),
  )
  console.log()
}
