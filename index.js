const path = require('path');
const child = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const minimist = require('minimist');
const get = require('lodash.get');
const asciiLogo = require('@ngx-rocket/ascii-logo');
const pkg = require('./package.json');

const isWin = process.platform.startsWith('win');
const generator = 'generator-ngx-rocket';
const appName = path.basename(process.argv[1]);
const help = `${chalk.bold('Usage')} ${appName} ${chalk.blue(
  '[command]'
)} [options]\n`;
const detailedHelp = `
${chalk.blue(
  'env'
)} <env_var> [<env_var2> ...] [--out <file>] [--format json|js]
  Export environment variables to a JSON or JavaScript file.
  Default output file is ${chalk.cyan('src/environments/.env.ts')}

${chalk.blue('cordova')} <command> [options] [-- <cordova_options>]
  Execute Cordova commands.
  Unless the ${chalk.cyan('--fast')} option is provided, the Angular app is
  rebuilt before executing the command, using ${chalk.cyan('npm run build')}.
  Any accepted Cordova option can be passed through after ${chalk.cyan('--')}.

  --fast            Skip Angular app rebuild
  --base-href <ref> Change application base URL (default is ./)
  --copy <path>     Copy built apps to path (only work with ${chalk.cyan(
    'cordova build'
  )})
  --dev             Build Angular app in dev mode (default is prod)
  -c, --configuration <name>
                    Target Angular CLI configuration for ${chalk.cyan(
                      'npm run build'
                    )}
  --device          Deploy Cordova build to a device
  --emulate         Deploy Cordova build to an emulator
  --debug           Create a Cordova debug build
  --release         Create a Cordova release build
  --verbose         Show Cordova debug output
  --yarn            Use Yarn instead of NPM to run the ${chalk.cyan(
    'build'
  )} script

${chalk.blue('clean')} [--cordova] [--dist] [--path <path>]
  Clean Cordova (${chalk.cyan('platforms')}, ${chalk.cyan(
  'plugins'
)}) and dist folders.

  --cordova         Remove only Cordova folders
  --dist            Remove only dist folder
  --path <path>     Remove only specified path

`;

class NgxScriptsCli {
  constructor(args) {
    this._args = args;
    this._options = minimist(args, {
      boolean: [
        'help',
        'fast',
        'dev',
        'device',
        'emulate',
        'debug',
        'release',
        'yarn',
        'cordova',
        'dist',
        'verbose'
      ],
      string: ['out', 'format', 'copy', 'configuration', 'path', 'base-href'],
      alias: {c: 'configuration'},
      default: {'base-href': './'},
      '--': true
    });
  }

  run() {
    if (this._options.help) {
      return this._help(true);
    }

    if (this._packageManager() === 'yarn') {
      this._options.yarn = true;
    }

    switch (this._args[0]) {
      case 'env':
        return this._env(
          this._options._.slice(1),
          this._options.out,
          this._options.format
        );
      case 'cordova':
        return this._cordova(this._options);
      case 'clean':
        return this._clean(this._options);
      default:
        this._help();
    }
  }

  _env(vars, outputFile = 'src/environments/.env.ts', format = 'js') {
    if (vars.length === 0) {
      this._exit(`${chalk.red('Missing arguments')}\n`);
    }

    let env = JSON.stringify(
      vars.reduce((env, v) => {
        env[v] = process.env[v] === undefined ? null : process.env[v];
        return env;
      }, {}),
      null,
      2
    );

    if (format === 'js') {
      // Change to single quotes
      env = env.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, v) => {
        const s = v.replace(/'/g, "\\'").replace(/\\"/g, '"');
        return `'${s}'`;
      });
      env = `export const env: { [s: string]: (string | null); } = ${env};\n`;
    }

    try {
      fs.writeFileSync(outputFile, env);
    } catch (error) {
      this._exit(
        `${chalk.red(
          `Error writing file: ${
            error && error.message ? error.message : error
          }`
        )}`
      );
    }
  }

  _cordova(options) {
    const spawnOptions = {
      stdio: 'inherit',
      shell: isWin
    };

    if (!options.fast) {
      const buildOptions = ['run', 'build'].concat(
        options.yarn ? [] : ['-s', '--']
      );
      buildOptions.push(`--base-href=${options['base-href']}`);
      if (options.dev) {
        buildOptions.push('--prod=false');
      }

      if (options.configuration) {
        buildOptions.push('--configuration');
        buildOptions.push(options.configuration);
      }

      const buildResult = child.spawnSync(
        options.yarn ? 'yarn' : 'npm',
        buildOptions,
        spawnOptions
      );
      if (buildResult.status) {
        this._exit(null, buildResult.status);
      }
    }

    const cordovaOptions = options._.slice(1);
    cordovaOptions.push('--no-telemetry');
    ['device', 'emulate', 'debug', 'release', 'verbose'].forEach(option => {
      if (options[option]) {
        cordovaOptions.push('--' + option);
      }
    });
    Array.prototype.push.apply(cordovaOptions, options['--']);

    const cordovaResult = child.spawnSync(
      `cordova`,
      cordovaOptions,
      spawnOptions
    );
    if (cordovaResult.status) {
      this._exit(null, cordovaResult.status);
    }

    if (options.copy) {
      if (cordovaOptions['0'] === 'build') {
        try {
          fs.ensureDirSync(options.copy);
          let copied = false;

          let androidApkPath = `platforms/android/app/build/outputs/apk/${
            options.release ? 'release' : 'debug'
          }`;
          if (!fs.existsSync('platforms/android/app/build')) {
            // For cordova-android < 7 compatibility
            androidApkPath = 'platforms/android/build/outputs/apk';
          }

          const androidPath = `${androidApkPath}/*-${
            options.release ? 'release' : 'debug'
          }*.apk`;
          copied = copied || this._copy(androidPath, options.copy);
          copied =
            copied ||
            this._copy('platforms/ios/build/device/*.ipa', options.copy);
          copied =
            copied ||
            this._copy('platforms/ios/build/device/*.xcarchive', options.copy);
          if (copied) {
            console.log(`Apps copied to ${chalk.cyan(options.copy)} folder`);
          } else {
            throw new Error('No app builds found');
          }
        } catch (error) {
          this._exit(
            `${chalk.red(
              `Error during apps copy: ${
                error && error.message ? error.message : error
              }`
            )}`
          );
        }
      } else {
        console.warn(
          `${chalk.yellow('--copy')} can only used with ${chalk.cyan(
            'cordova build'
          )}`
        );
      }
    }
  }

  _copy(src, dest) {
    try {
      child.execSync(`${isWin ? 'xcopy /S /Y' : 'cp -Rf'} ${src} ${dest}`, {
        stdio: 'ignore'
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  _clean(options) {
    if (!options.cordova && !options.dist && !options.path) {
      options.cordova = true;
      options.dist = true;
    }

    if (options.cordova) {
      this._remove('platforms');
      this._remove('plugins');
    }

    if (options.dist) {
      let angularCliConfig;
      try {
        angularCliConfig = require(path.join(process.cwd(), 'angular.json'));
      } catch (error) {
        this._exit(
          `${chalk.red(
            `Error reading angular.json: ${
              error && error.message ? error.message : error
            }`
          )}`
        );
      }

      if (angularCliConfig.projects) {
        /* eslint guard-for-in: "off" */
        for (const projectName in angularCliConfig.projects) {
          const outDir = get(
            angularCliConfig.projects[projectName],
            'architect.build.options.outputPath'
          );
          if (outDir) {
            this._remove(outDir);
          }
        }
      }
    }

    if (options.path) {
      fs.removeSync(options.path);
    }
  }

  _remove(path) {
    try {
      fs.removeSync(path);
      console.log(`Removed ${chalk.yellow(path)}`);
    } catch (error) {
      this._exit(
        `${chalk.red(
          `Error while removing ${path}: ${
            error && error.message ? error.message : error
          }`
        )}`
      );
    }
  }

  _packageManager() {
    let pm = null;
    try {
      const rc = require(path.join(process.cwd(), '.yo-rc.json'));
      pm = rc[generator].props.packageManager;
    } catch (error) {
      // Do nothing
    }

    return pm || process.env.NGX_PACKAGE_MANAGER || 'npm';
  }

  _help(details) {
    console.log(asciiLogo(pkg.version, 'APP SUPPORT SCRIPTS'));
    this._exit(
      help +
        (details
          ? detailedHelp
          : `Use ${chalk.white('--help')} for more info.\n`)
    );
  }

  _exit(error, code = 1) {
    if (error) {
      console.error(error);
    }

    /* eslint unicorn/no-process-exit: "off" */
    process.exit(code);
  }
}

module.exports = NgxScriptsCli;
