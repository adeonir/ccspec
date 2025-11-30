import boxen from 'boxen'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { printBanner } from '~/utils/banner'
import { fileExists } from '~/utils/files'
import { createDirectories, writeAgents, writeCommands, writeTemplates } from '~/utils/setup'

export async function init(): Promise<void> {
  try {
    printBanner()

    if (fileExists('.ccspec')) {
      console.log(chalk.yellow(`\nccspec already initialized.`))
      console.log(chalk.gray(`Run ${chalk.bold('ccspec update')} to update templates and commands.\n`))
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
    spinner.text = 'Writing agents...'
    await writeAgents()
    spinner.text = 'Writing commands...'
    await writeCommands()

    spinner.succeed(chalk.green(`ccspec initialized successfully!`))
    printSuccess()
  } catch (error) {
    ora().fail(chalk.red('Initialization failed'))
    console.log(chalk.red.bold('\nError:'))
    console.log(chalk.red(`   ${error instanceof Error ? error.message : String(error)}\n`))
    process.exit(1)
  }
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
