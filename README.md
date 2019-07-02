# :rocket: ngx-rocket/scripts

[![NPM version](https://img.shields.io/npm/v/@ngx-rocket/scripts.svg)](https://www.npmjs.com/package/@ngx-rocket/scripts)
[![Build status](https://img.shields.io/travis/ngx-rocket/scripts/master.svg)](https://travis-ci.org/ngx-rocket/scripts)
![Node version](https://img.shields.io/node/v/@ngx-rocket/scripts.svg)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Support scripts for ngX-Rocket projects.

In order to simplify the workflow of applications generated with
[ngX-Rocket generator](https://github.com/ngx-rocket/generator-ngx-rocket), we made this repo to gather all additional
scripts and build tools.

Since this module is an independant package, you can even use for projects not built from ngX-Rocket if you find it
useful.

## Installation

```bash
npm install --save @ngx-rocket/scripts
```

## Usage

This modules provides CLI commands to be used in [NPM scripts](https://docs.npmjs.com/misc/scripts), along with some
[Cordova hooks](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/) (see `hooks` folder).

### Export environment variables to a JSON or JavaScript file

`ngx-scripts env <env_var> [<env_var2> ...] [--out <file>] [--format json|js]`

Default output file is `src/environments/.env.ts` with JavaScript format.

### Execute Cordova commands

`ngx-scripts cordova <command> [options] [-- <cordova_options>]`

Unless the `--fast` option is provided, the Angular app is rebuilt before executing the command, using `npm run build`.
Any accepted Cordova option can be passed through after `--`.

#### Options
- `--fast`: Skip Angular app rebuild
- `--base-href <ref>`: Change application base URL (default is `./`)
- `--copy <path>`: Copy built apps to the specified path (only works with `cordova build`)
- `--dev`: Build Angular app in `dev` mode (default is `prod`)
- `-c, --configuration <name>`: Target Angular CLI configuration for `npm run build`
- `--device`: Deploy Cordova build to a device
- `--emulate`: Deploy Cordova build to an emulator
- `--debug`: Create a Cordova debug build
- `--release`: Create a Cordova release build
- `--verbose`: Show Cordova debug output
- `--yarn`: Use [Yarn](https://yarnpkg.com) instead of NPM to run the `build` script

> Note: Yarn is automatically used instead of NPM is the environment variable `NGX_PACKAGE_MANAGER` is set to `yarn` or
> if the current project was generated with ngX-Rocket using Yarn option (option is saved in `.yo-rc.json`).

#### Examples
```bash
ngx-scripts cordova prepare
ngx-scripts cordova run ios --dev --debug --emulate
ngx-scripts cordova build ios --configuration production --device --release -- --developmentTeam="ABCD" --provisioningProfile="UUID"
````

### Clean Cordova (`platforms`, `plugins`) and dist folders

`clean [--cordova] [--dist] [--path <path>]`

#### Options
- `--cordova`: Remove only Cordova folders
- `--dist`: Remove only dist folder
- `--path <path>`: Remove only specified path

# License

[MIT](LICENSE)
