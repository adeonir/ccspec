import boxen from 'boxen'
import chalk from 'chalk'

const banner = [
  ' ██████╗ ██████╗███████╗██████╗ ███████╗ ██████╗',
  '██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝',
  '██║     ██║     ███████╗██████╔╝█████╗  ██║     ',
  '██║     ██║     ╚════██║██╔═══╝ ██╔══╝  ██║     ',
  '╚██████╗╚██████╗███████║██║     ███████╗╚██████╗',
  ' ╚═════╝ ╚═════╝╚══════╝╚═╝     ╚══════╝ ╚═════╝',
].join('\n')

const tagline = 'Simplified Spec-Driven Development for Claude Code'

export function printBanner(): void {
  console.log()
  console.log(
    boxen(`${chalk.blue(banner)}\n\n${chalk.blue.bold(tagline)}`, {
      padding: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      textAlignment: 'center',
      width: process.stdout.columns - 4,
    }),
  )
  console.log()
}
