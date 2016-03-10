'use strict'
const co = require('co')
const execa = require('execa')
const match = require('multimatch')
const prompt = require('co-prompt')

module.exports = co.wrap(function* (cli) {
	const gitBranches = yield execa.shell('git branch')
	// no branches
	if (!gitBranches.stdout || gitBranches.stderr) {
		console.log(gitBranches.stderr || `No branches could be removed!`.red)
		process.exit()
	}
	// get branches
	let branches = gitBranches.stdout.split('\n').map(val => val.substr(2))
	const patterns = cli._.length > 0 ? cli._ : ['**', '!master']
	branches = match(branches, patterns)

	if (branches.length === 0) {
		console.log(`No matched branches!`.yellow)
		process.exit()
	}

	for (let branch of branches) {
		const sure = yield prompt.confirm(`Are you sure to delete branch ${branch.cyan}? [N/y] `)
		if (sure) {
			let deleteBranch
			try {
				yield execa.shell(`git branch -d ${branch}`)
				yield execa.shell(`git push ${cli.stream} -d ${branch}`)
				console.log(`deleted!`.green)
			} catch (e) {
				console.log(e.message.red)
			}
		} else {
			console.log(`skipped!`.yellow)
		}
	}
	process.exit()
})
