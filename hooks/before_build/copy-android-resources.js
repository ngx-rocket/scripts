#!/usr/bin/env node

/**
 * This hook copies any file (images, sound, etc) to the Android native
 * resources path, so that they can be used by native plugins.
 * The input resource path can be changed using by setting the environment
 * variable ANDROID_NATIVE_RESOURCES_PATH.
 */

const exec = require('child_process').exec;

const rootdir = process.argv[2];
const isWin = /^win/.test(process.platform);
const inputPath = process.env.ANDROID_NATIVE_RESOURCES_PATH || 'resources/android/extra/';
const androidResourcesPath = 'platforms/android/res/';

function copyAndroidResources() {
  const command = `${isWin ? 'xcopy /S /Y' : 'cp -Rf'} ${inputPath}* ${androidResourcesPath}`;
  process.stdout.write('Executing command: ' + command);
  exec(command);
  process.stdout.write('Android native resources copied');
}

if (rootdir) {
  copyAndroidResources();
}
