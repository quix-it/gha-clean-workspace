const core = require('@actions/core')
const cleanup = require('./cleanup.js')

if (core.getBooleanInput('post')) {
  cleanup.clean(core.getInput('path')).then(console.log).catch(console.error)
}
