const core = require('@actions/core')
const github = require('@actions/github')
const cleanup = require('./cleanup.js')

cleanup.clean(core.getInput('path')).then(console.log).catch(console.error)

console.log(github.context)
