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