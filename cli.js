#!/usr/bin/env node
'use strict'
const minimist = require('minimist')
const pkg = require('./package')
const main = require('./')
require('colorful').toxic()

const help = `
  ${`Usage:`.bold}

    rm-branches [patterns]

    -r/--remote:     Remove remote branch as well
    -v/--version:    Print version
    -h/--help:       Print help
`

const cli = minimist(process.argv.slice(2), {
	alias: {
		h: 'help',
		v: 'version',
		r: 'remote',
		s: 'stream'
	},
	default: {
		stream: 'origin'
	}
})

if (cli.help) {
	console.log(help)
	process.exit()
}

if (cli.version) {
	console.log(pkg.version)
	process.exit()
}

main(cli).catch(err => {
	console.log(err.message.red)
	process.exit(1)
})
