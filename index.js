'use strict'
const co = require('co')
const execa = require('execa')
const match = require('multimatch')
const prompt = require('co-prompt')

module.exports = co.wrap(function* (cli) {
	const gitBranches = yield execa.shell('git branch')
	// no branches
	if (!gitBranches.stdout || gitBranches.stderr) {
		console.log(gitBranches.stderr || 'No branches could be removed!')
		process.exit()
	}
	// get branches
	let branches = gitBranches.stdout.split('\n').map(val => val.substr(2))
	const patterns = cli._.length > 0 ? cli._ : ['**', '!master']
	branches = match(branches, patterns)

	// git command options
	let options = 'd'
	if (cli.remote) {
		options += 'r'
	}

	for (let branch of branches) {
		const sure = yield prompt.confirm(`Are you sure to delete branch ${branch.cyan}? [N/y] `)
		if (sure) {
			const deleteBranch = yield execa.shell(`git branch -${options} ${branch}`)
			if (deleteBranch.stderr) {
				console.log(deleteBranch.stderr.red)
			} else {
				console.log(`deleted!`.green)
			}
		}
	}
	process.exit()
})
