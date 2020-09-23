# AAB2APK: AAB -> APK the easy way

AAB2APK provides an easy way for you to convert your `.aab` file to an `.apk` one. The application allows you to drag and drop the file you want to convert, and points you to the converted file.

## Setup

1. From the [releases](https://github.com/makunomark/aab2apk/releases) page, find the latest release and download an install file.
1. On first run, the application will request you to download [bundletool-all-1.0.0.jar](https://github.com/google/bundletool/releases/download/1.0.0/bundletool-all-1.0.0.jar). If you already have one, drag and drop it to the space.

## Known issues

1. Currently works on MacOS only
1. Requires that you have Android SDK version `30.0.0` installed in the default installation directory. Usually this points to `Library/Android/sdk/`
1. There's no visual indication of when a process of converting is in progress or complete or worse, when an error occurs. To know when the process is complete, the directory of the output APK file will be opened. This usually takes 10-15 seconds. If 30 seconds elapse, and the output directory is not opened, click on `View > Toggle Developer Tools` and check the console.
