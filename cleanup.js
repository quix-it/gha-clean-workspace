const glob = require('glob')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const util = require('util');

const primraf = util.promisify(rimraf)
const stat = util.promisify(fs.stat)
const pglob = util.promisify(glob)

// promisified clean
module.exports.clean = async function(lpath) {
  return new Promise((resolve, reject) => {
    stat(lpath)
    .catch(reject)
    .then( () => {
      pglob(path.join(lpath,'*'), { dot: true })
      .catch(reject)
      .then( files => {
        Promise.all(files.map(entry => primraf(entry)))
        .catch(reject)
        .then(() => { resolve(`Path "${lpath}" has been purged`) })
      })
    })
  })
}
