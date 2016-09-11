let pkg = require('./package.json')
let sh = require('shelljs')
let gh_pages_url = pkg.repository.url // TODO: or pkg.homepage? or other?
let gh_pages_branch = 'gh-pages' // TODO: or 'master' if the URL matches a user page or project page, or doc?
let scratch_repo = '.magical-gh-pages' // TODO: Make configurable
let dist = 'dist' // TODO: Make it a parameter?
let msg = 'deploy' // TODO: Make configurable
// TODO: How to verify git is on the path?
// TODO: Stop script on errors
sh.cd(__dirname)
sh.rm('-rf', '.magical-gh-pages')
sh.exec(`git clone ${gh_pages_url} ${scratch_repo} --branch ${gh_pages_branch} --bare --depth 1`)
sh.exec(`git --git-dir=${scratch_repo} --work-tree=${dist} add -A`)
sh.exec(`git --git-dir=${scratch_repo} --work-tree=${dist} commit -m ${msg}`)
sh.exec(`git --git-dir=${scratch_repo} --work-tree=${dist} push ${gh_pages_url} ${gh_pages_branch}`)
