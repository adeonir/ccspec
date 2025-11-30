import '~/utils/node-check'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Command } from 'commander'
import { clear } from '~/cli/clear'
import { init } from '~/cli/init'
import { update } from '~/cli/update'

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const program = new Command()

program.name('ccspec').description('Simplified Spec-Driven Development for Claude Code').version(packageJson.version)

program.command('init').description('Initialize ccspec in current project').action(init)

program
  .command('update')
  .description('Update ccspec templates and commands to latest version')
  .option('-f, --force', 'Skip confirmation prompt')
  .action(update)

program.command('clear').description('Remove all ccspec files and configuration').action(clear)

program.parse()
