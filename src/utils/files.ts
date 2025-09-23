import chalk from 'chalk'
import fs from 'fs-extra'

export async function ensureDir(path: string): Promise<void> {
  await fs.ensureDir(path)
}

export async function writeFile(path: string, content: string): Promise<void> {
  await fs.writeFile(path, content, 'utf8')
}

export async function ensureDirVerbose(path: string): Promise<void> {
  await fs.ensureDir(path)
  console.log(`${chalk.green('✓')} Created ${path}`)
}

export async function writeFileVerbose(path: string, content: string): Promise<void> {
  await fs.writeFile(path, content, 'utf8')
  console.log(`${chalk.green('✓')} Added ${path}`)
}

export function fileExists(path: string): boolean {
  return fs.existsSync(path)
}

export async function removeDir(path: string): Promise<void> {
  await fs.remove(path)
}

export async function removeFile(path: string): Promise<void> {
  await fs.remove(path)
}
