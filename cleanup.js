const glob = require('glob')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

module.exports.clean = async function(lpath) {
  return new Promise((resolve, reject) => {
    fs.stat(lpath, (err, stats) => {
      if (err)
        reject(err)
      else
        glob(path.join(lpath,'*'), function (gerr, res) {
          if (gerr) {
            reject(gerr)
          }
          else {
            Promise.all(
              res.map((entry) => {
                rimraf(entry, (rerr) => {
                  if (rerr) {
                    reject(rerr)
                  }
                })
              })
            ).then(resolve(`Path ${lpath} has been purged`))
          }
        })
    })
  })
}
