const { test, expect } = require('@jest/globals');
const cleanup = require('./cleanup');
const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');

const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)
const pglob = util.promisify(glob)

const basedir = ".test"
const items = [
  "d1/d11/.f111",
  "d1/d11/f112",
  "d1/.d12/f121",
  ".d2/d21/.f211",
  ".d2/.d21/.f211",
  ".f1",
  "f2"
]

const dirs = [... new Set(items.map(x => path.join(basedir,x).split("/").slice(0, -1).join("/")).filter(y => y.length > 0))]
const files = [... new Set(items.filter(x => !x.endsWith("/")).map(x => path.join(basedir,x)))]

test('make test fs structure', async () => {
  const pdirs = Promise.all(
    dirs.map(d => mkdir(d, { recursive: true }))
  )
  expect(pdirs).resolves.toBeTruthy()
  await pdirs

  const pfiles = Promise.all(
    files.map(f => writeFile(f, `this is file ${f}`))
  )
  expect(pfiles).resolves.toBeTruthy()
  await pfiles

  // list files

  const plist = pglob('**', { cwd: basedir, dot: true, nodir: true })
  expect(plist).resolves.toBeTruthy()
  const filelist = await plist
  expect(filelist.length).toEqual(files.length)

})

test('purge directory', async () => {

  // fs structure has been created
  // now delete it
  const plist_before = pglob('**', { cwd: basedir, dot: true, nodir: true })
  expect(plist_before).resolves.toBeTruthy()
  const filelist_before = await plist_before
  expect(filelist_before.length).toEqual(files.length)

  const pclean = cleanup.clean(basedir)
  expect(pclean).resolves.toBeTruthy()
  await pclean

  const plist_after = pglob('**', { cwd: basedir, dot: true })
  expect(plist_after).resolves.toBeTruthy()
  const filelist_after = await plist_after
  expect(filelist_after.length).toEqual(0)
})
