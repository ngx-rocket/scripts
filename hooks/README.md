# Cordova hooks

This directory contains scripts that may be called from Cordova `config.xml` file.
See [Cordova hooks documentation](https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/) for more details.

## Copy Android Resources

> This hook copies any file (images, sound, etc) to the Android native resources path, so that they can be used by
> native plugins.

The input resource path can be changed by setting the environment variable `ANDROID_NATIVE_RESOURCES_PATH`.

**Only for `cordova` <= 7.x and `cordova-android` < 7!**

When using newer cordova versions you can use the new `<resource-file>` tag like this:
```xml
<platform name="android">
  <resource-file src="www/res/drawable-hdpi/yourImage.png" target="res/drawable-hdpi/yourImage.png" />
</platform>
```

### Usage

1. Install `@ngx-rocket/script` as a development dependency: `npm install --save-dev @ngx-rocket/script`

2. Add this entry to your `config.xml` file, within your ` <platform name="android"></platform>` section:
   ```xml
   <hook type="after_prepare" src="node_modules/@ngx-rocket/scripts/hooks/after_prepare/copy-android-resources.js" />
   ```