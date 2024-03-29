## [5.2.3](https://github.com/ngx-rocket/scripts/compare/5.2.2...5.2.3) (2022-11-28)


### chore

* update min node version ([16b06f5](https://github.com/ngx-rocket/scripts/commit/16b06f5769f3326d47bec83c9621494aa95a2274))


### BREAKING CHANGES

* Minimum supported Node.js version is now >=14

## [5.2.2](https://github.com/ngx-rocket/scripts/compare/5.2.1...5.2.2) (2022-08-24)

## [5.2.1](https://github.com/ngx-rocket/scripts/compare/5.2.0...5.2.1) (2021-12-10)


### Bug Fixes

* incorrect android build path ([0d4374e](https://github.com/ngx-rocket/scripts/commit/0d4374eb9670b8a4ae29144e0b6fe1112cce1258))

# [5.2.0](https://github.com/ngx-rocket/scripts/compare/5.1.2...5.2.0) (2021-12-10)


### Features

* add support for cordova-android 10 ([edb0454](https://github.com/ngx-rocket/scripts/commit/edb04546653e40501fd5e217586ece85c11b92dd))

## [5.1.2](https://github.com/ngx-rocket/scripts/compare/5.1.1...5.1.2) (2021-11-30)

## [5.1.1](https://github.com/ngx-rocket/scripts/compare/5.1.0...5.1.1) (2021-07-20)


### chore

* update deps ([7e8a836](https://github.com/ngx-rocket/scripts/commit/7e8a83625a351f5684c1b75e961504734f17b7dd))


### BREAKING CHANGES

* Requires Node >= 12

# [5.1.0](https://github.com/ngx-rocket/scripts/compare/5.0.0...5.1.0) (2021-03-12)


### Features

* add option to parse JSON in environment variables ([#24](https://github.com/ngx-rocket/scripts/issues/24)) ([7f2c532](https://github.com/ngx-rocket/scripts/commit/7f2c532169c57f7a5c3bc706bad38bdb437dffc7))

# [5.0.0](https://github.com/ngx-rocket/scripts/compare/4.0.1...5.0.0) (2021-01-08)


* chore!: fix incorrect version number ([67031d4](https://github.com/ngx-rocket/scripts/commit/67031d4cd2b758d18db1f5566a895098ea238eda))


### BREAKING CHANGES

* Just to force correct release version

# [4.0.0](https://github.com/ngx-rocket/scripts/compare/3.1.0...4.0.0) (2021-01-08)


* chore!: fix incorrect version number ([67031d4](https://github.com/ngx-rocket/scripts/commit/67031d4cd2b758d18db1f5566a895098ea238eda))


### BREAKING CHANGES

* Just to force correct release version

# [3.1.0](https://github.com/ngx-rocket/scripts/compare/3.0.4...3.1.0) (2021-01-08)


### Bug Fixes

* changed env's default export to named export ([691f10c](https://github.com/ngx-rocket/scripts/commit/691f10c5ad2d3dc53e465c02045910e6642e8838))
* make env handle null with noImplicitAny  ([fc4a71d](https://github.com/ngx-rocket/scripts/commit/fc4a71de8daff044566fff7bd7b532cd4acbd347))


### chore

* update dependencies ([d633edd](https://github.com/ngx-rocket/scripts/commit/d633eddeb96b8625877c561bc87609178f093476))


### Features

* add --app option (closes [#18](https://github.com/ngx-rocket/scripts/issues/18)) ([77e951d](https://github.com/ngx-rocket/scripts/commit/77e951dc49ed897866a61d9bb51759356e0a2f4a))


### BREAKING CHANGES

* requires Node.js version >= 10.0.0

# 4.0.0
- BREAKING CHANGE: requires Node.js version >= 8.0.0
- BREAKING CHANGE: `env` command now generates an explicit export instead of a default export
- BREAKING CHANGE: remove `unpin-ionic-dependencies` command, as it's no longer needed for Ionic@4

# 3.0.4
- Bump dependencies and fix vulnerabilities

# 3.0.3
- Allow env to add undefined env vars (fixes #8)

# 3.0.2
- Replaced eslint by XO and updated dependencies

# 3.0.1
- Fixed clean command for `angular/cli@6`

# 3.0.0
- BREAKING CHANGE: changed `--env` to `--configuration`, to match `angular-cli@6` changes
- Fixed `--dev` option
- Updated dependencies

# 2.2.0
- Added compatibility with `cordova-android@7`

# 2.1.0
- Added `--base-href` option that defaults to `./` for cordova builds (https://github.com/ngx-rocket/generator-ngx-rocket/issues/249)

# 2.0.0
- BREAKING CHANGE: renamed `env2json` script to `env` and changed its default behavior to export to a `.ts` file

# 1.1.0
- Added yarn usage detection (https://github.com/ngx-rocket/generator-ngx-rocket/issues/49)
- Fixed passing Cordova arbitrary options
- Added `--verbose` option for Cordova

# 1.0.5
- Fixed extra resources copy on OS X/Linux (https://github.com/ngx-rocket/generator-ngx-rocket/issues/137)

# 1.0.3
- Properly fixed extra resources copy

# 1.0.2
- Fixed extra resources copy on Windows

# 1.0.1
- Fixed `cordova` commands on Windows (https://github.com/ngx-rocket/generator-ngx-rocket/issues/117)

# 1.0.0
- Initial release
