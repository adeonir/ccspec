import './utils/node-check'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Command } from 'commander'
import { clear } from './cli/clear'
import { init } from './cli/init'

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const program = new Command()

program.name('ccspec').description('Simplified Spec-Driven Development for Claude Code').version(packageJson.version)

program
  .command('init')
  .description('Initialize ccspec in current project')
  .option('--config', 'Create .ccspecrc.json configuration file')
  .action(init)

program.command('clear').description('Remove all ccspec files and configuration').action(clear)

program.parse()
