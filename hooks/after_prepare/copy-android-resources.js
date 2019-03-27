#!/usr/bin/env node

/**
 * This hook copies any file (images, sound, etc) to the Android native
 * resources path, so that they can be used by native plugins.
 * The input resource path can be changed by setting the environment
 * variable ANDROID_NATIVE_RESOURCES_PATH.
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const rootdir = process.argv[2];
const isWin = process.platform.startsWith('win');
const inputPath =
  process.env.ANDROID_NATIVE_RESOURCES_PATH ||
  path.normalize('resources/android/extra');
let androidResourcesPath = path.normalize('platforms/android/app/src/main/res');

if (!fs.existsSync(androidResourcesPath)) {
  // For cordova-android < 7 compatibility
  androidResourcesPath = path.normalize('platforms/android/res');
}

function copyAndroidResources() {
  const command = `${isWin ? 'xcopy /S /Y /I' : 'cp -Rfv'} "${inputPath +
    path.sep}." "${androidResourcesPath}"`;
  process.stdout.write(
    `Copying Android native resources with command: ${command}\n`
  );
  execSync(command, {stdio: 'inherit'});
}

if (rootdir) {
  copyAndroidResources();
}
