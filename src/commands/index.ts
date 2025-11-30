import clarifyCommand from './clarify.md?raw'
import createCommand from './create.md?raw'
import implementCommand from './implement.md?raw'
import planCommand from './plan.md?raw'
import tasksCommand from './tasks.md?raw'

export const commands = {
  create: createCommand,
  clarify: clarifyCommand,
  plan: planCommand,
  tasks: tasksCommand,
  implement: implementCommand,
}
