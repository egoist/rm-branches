# rm-branches [![NPM version](https://img.shields.io/npm/v/rm-branches.svg)](https://npmjs.com/package/rm-branches) [![NPM downloads](https://img.shields.io/npm/dm/rm-branches.svg)](https://npmjs.com/package/rm-branches) [![Build Status](https://img.shields.io/circleci/project/egoist/rm-branches/master.svg)](https://circleci.com/gh/egoist/rm-branches)

> An interactive cli tool to remove git branches.

![preview](/media/rm.gif)

## Install

```bash
$ npm install -g rm-branches
```

## Usage

```bash
# follow the output instructions to remove branches
# master branch is excluded by default
$ rm-branches
Are you sure to delete branch fix/typo? [N/y]

# use custom patterns to choose branches
# in minimatch syntax
$ rm-branches fix/* patch-*
```

## Help

```bash
$ rm-branches -h

  Usage:

    rm-branches [patterns]

    -r/--remote:     Remove remote branch as well
    -v/--version:    Print version
    -h/--help:       Print help
```

## License

MIT © [EGOIST](https://github.com/egoist)
