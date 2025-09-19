import chalk from 'chalk'
import ora from 'ora'
import { commands } from '../commands'
import { templates } from '../templates'
import { ensureDir, fileExists, writeFile } from '../utils/files'

interface InitOptions {
  config?: boolean
}

export async function init(options: InitOptions): Promise<void> {
  try {
    if (fileExists('.ccspec')) {
      console.log(chalk.yellow('\nccspec already initialized!\n'))
      return
    }

    console.log(chalk.blue.bold('\nInitializing ccspec...\n'))

    const spinner = ora('Creating directories...').start()
    await createDirectories()
    spinner.text = 'Writing templates...'
    await writeTemplates()
    spinner.text = 'Writing commands...'
    await writeCommands()

    if (options.config) {
      spinner.text = 'Creating configuration file...'
      await createConfig()
    }

    spinner.succeed('ccspec initialized!')
    printSuccess()
  } catch (error) {
    ora().fail('Initialization failed')
    console.log(chalk.red.bold('\nError:\n'))
    console.log(chalk.red(error instanceof Error ? error.message : String(error)))
    process.exit(1)
  }
}

async function createDirectories(): Promise<void> {
  await ensureDir('.claude/commands')
  await ensureDir('.ccspec/templates')
}

async function writeTemplates(): Promise<void> {
  await writeFile('.ccspec/templates/spec.md', templates.spec)
  await writeFile('.ccspec/templates/plan.md', templates.plan)
  await writeFile('.ccspec/templates/tasks.md', templates.tasks)
}

async function writeCommands(): Promise<void> {
  await writeFile('.claude/commands/spec.md', commands.spec)
  await writeFile('.claude/commands/plan.md', commands.plan)
  await writeFile('.claude/commands/tasks.md', commands.tasks)
  await writeFile('.claude/commands/implement.md', commands.implement)
}

async function createConfig(): Promise<void> {
  const config = {
    specDir: 'specs',
    // "branchPrefix": "",
    // "autoNumbering": false
  }

  await writeFile('.ccspecrc.json', JSON.stringify(config, null, 2))
}

function printSuccess(): void {
  console.log(chalk.cyan('\nNext steps:'))
  console.log(`  1. ${chalk.white('Open Claude Code')}`)
  console.log(`  2. ${chalk.white('Type /spec to get started\n')}`)
}
