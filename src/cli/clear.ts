import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { printBanner } from '../utils/banner'
import { fileExists, removeDir, removeFile } from '../utils/files'

function hasCommandFiles(): boolean {
  const commandFiles = ['spec.md', 'clarify.md', 'plan.md', 'tasks.md', 'implement.md']
  return commandFiles.some((file) => fileExists(`.claude/commands/${file}`))
}

export async function clear(): Promise<void> {
  try {
    if (!fileExists('.ccspec') && !hasCommandFiles() && !fileExists('specs')) {
      console.log(chalk.yellow(`⚠ No ${chalk.bold('ccspec')} files found to clear.\n`))
      return
    }

    printBanner()

    const filesToClear = []
    if (fileExists('.ccspec')) filesToClear.push('.ccspec directory')
    if (hasCommandFiles()) filesToClear.push('Claude commands in .claude/commands/')
    if (fileExists('specs')) filesToClear.push('specs directory with all specifications')

    console.log(chalk.yellow(`\n⚠ This will remove:`))
    for (const file of filesToClear) {
      console.log(chalk.yellow(`   • ${file}`))
    }
    console.log()

    const { proceed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: `Clear all ${chalk.bold('ccspec')} files?`,
        default: false,
      },
    ])

    if (!proceed) {
      console.log(chalk.gray('Clear operation cancelled.\n'))
      return
    }

    const spinner = ora('Clearing ccspec files...').start()

    if (fileExists('.ccspec')) {
      await removeDir('.ccspec')
    }

    if (hasCommandFiles()) {
      const commandFiles = ['spec.md', 'clarify.md', 'plan.md', 'tasks.md', 'implement.md']
      for (const file of commandFiles) {
        const filePath = `.claude/commands/${file}`
        if (fileExists(filePath)) {
          await removeFile(filePath)
        }
      }
    }

    if (fileExists('specs')) {
      await removeDir('specs')
    }

    spinner.succeed(chalk.green(`✓ ${chalk.bold('ccspec')} files cleared successfully!`))
    console.log(chalk.gray(`   Run ${chalk.bold('ccspec init')} to reinitialize.\n`))
  } catch (error) {
    ora().fail(chalk.red('✗ Clear operation failed'))
    console.log(chalk.red.bold('\nError:'))
    console.log(chalk.red(`   ${error instanceof Error ? error.message : String(error)}\n`))
    process.exit(1)
  }
}
