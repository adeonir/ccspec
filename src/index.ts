import { commands } from './commands'
import { templates } from './templates'

console.log('NanoSpec Templates:')
console.log('- spec.md:', templates.spec.length, 'chars')
console.log('- plan.md:', templates.plan.length, 'chars')
console.log('- tasks.md:', templates.tasks.length, 'chars')

console.log('\nNanoSpec Commands:')
console.log('- spec:', commands.spec.length, 'chars')
console.log('- plan:', commands.plan.length, 'chars')
console.log('- tasks:', commands.tasks.length, 'chars')
console.log('- implement:', commands.implement.length, 'chars')
