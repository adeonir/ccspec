import boxen from 'boxen'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { commands } from '../commands'
import { templates } from '../templates'
import { printBanner } from '../utils/banner'
import { ensureDir, fileExists, writeFile } from '../utils/files'

interface InitOptions {
  config?: boolean
}

export async function init(options: InitOptions): Promise<void> {
  try {
    printBanner()

    if (fileExists('.ccspec')) {
      console.log(chalk.yellow(`⚠ ${chalk.bold('ccspec')} already initialized!\n`))
      return
    }

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

    spinner.succeed(chalk.green(`✓ ${chalk.bold('ccspec')} initialized successfully!`))
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
    branchPrefix: '',
    autoNumbering: false,
  }

  await writeFile('.ccspecrc.json', JSON.stringify(config, null, 2))
}

function printSuccess(): void {
  const nextSteps = `1. Open Claude Code
2. Type ${chalk.blue.bold('/spec')} to get started
3. Follow: ${chalk.gray.bold('/spec')} → ${chalk.gray.bold('/plan')} → ${chalk.gray.bold('/tasks')} → ${chalk.gray.bold('/implement')}`

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
