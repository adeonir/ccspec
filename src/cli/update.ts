import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { printBanner } from '~/utils/banner'
import { fileExists } from '~/utils/files'
import { createDirectories, writeAgents, writeCommands, writeTemplates } from '~/utils/setup'

export async function update(options: { force?: boolean }): Promise<void> {
  try {
    if (!fileExists('.ccspec')) {
      console.log(chalk.yellow(`\nccspec not initialized.`))
      console.log(chalk.gray(`Run ${chalk.bold('ccspec init')} first.\n`))
      return
    }

    printBanner()

    if (!options.force) {
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: `Update ${chalk.bold('ccspec')} templates, commands, and agents?`,
          default: true,
        },
      ])

      if (!proceed) {
        console.log(chalk.gray('Update cancelled.\n'))
        return
      }
    }

    const spinner = ora('Updating directories...').start()
    await createDirectories()
    spinner.text = 'Updating templates...'
    await writeTemplates()
    spinner.text = 'Updating agents...'
    await writeAgents()
    spinner.text = 'Updating commands...'
    await writeCommands()

    spinner.succeed(chalk.green(`ccspec updated successfully!`))
    console.log()
  } catch (error) {
    ora().fail(chalk.red('Update failed'))
    console.log(chalk.red.bold('\nError:'))
    console.log(chalk.red(`   ${error instanceof Error ? error.message : String(error)}\n`))
    process.exit(1)
  }
}
