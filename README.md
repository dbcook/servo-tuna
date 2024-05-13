# servo-tuna - Servo tuning app for USB-serial connected motors

__CAVEAT__ This is WIP and doesn't do anything useful yet!

This is an embryonic try at creating a cross-platform Node/React based app for tuning USB-serial connected servos.

The initial target is the
[StepperOnline iSV57T](https://www.omc-stepperonline.com/nema-23-integrated-easy-servo-motor-90w-3000rpm-0-3nm-42-49oz-in-20-50vdc-brushless-dc-servo-motor-isv57t-090)
series of servos.

## Project Status

*RESEARCHING*

The current issue is to find a serial port library for node.js apps that has sufficient features
to robustly run proper serial protocols asynchronously, and that
will run inside all major Node frameworks (Electron, next.js, etc).

The most obvious candidate has been ruled out - see details under "Things that Don't Work".
I am not eager to build a new serial library but it might be necessary.


## Motivation

The StepperOnline iSV57T NEMA 23 servos are very inexpensive ($100 price point) servos with stepper-compataible pulse/dir control and high resolution 32K encoders.
This makes them conceptually very attractive for a number of DIY applications including CNC machine conversions, telescope mount drives, etc.

However the [tuning app](https://www.omc-stepperonline.com/index.php?route=product/product/get_file&file=1361/iSV-T_software.zip) provided by StepperOnline is execrable.

* Windows-only
* No real documentation
* Unhelpful guess-the-port serial port connection UI
* Very badly translated help text and error messages
* Poor graph interface with totally antique controls, no sliders, etc.
* Doesn't follow conventional terminology for PID control
* Auto-tune features totally ineffective

## Goals

* Cross-platform app using Node.js (via the next.js framework), React UI components, and the serialport library for Node.
* Reverse engineer the serial protocol for the iSV57T servos.
* Help selecting the correct serial port
* Much more intuitive UI
* Useful embedded help
* Effective wide-range auto-tuning with frequency response analysis
* Drastically improved performance graph functionality and automation
* Extendable to other serial port configured servos like ClearPath, DMM, etc.

## Possible Limitations

* Serial port may not offer full rate step/direction support.
* The tuning program thus might need access to some hardware that can work
  as a pulse function generator.  Need rates up to 300KHz to fully exercise the servos.
  This implies a pretty fast MCU like a Teensy 4.1.

## Framework Elements

[Node.js](https://nodejs.org/en/download/)

[React UI Components](https://react.dev/learn/start-a-new-react-project)

[Next.js Framework](https://nextjs.org/)

## Things that Don't Work

[Node SerialPort](https://serialport.io/) - REJECTED

So far I've determined that the [standalone serialport node library](https://serialport.io/)
is not suitable for this application.  Although it's been around for 10+ years, it
lacks various crucial design features:

1. There's no provision for full control of the HW flow control lines on all platforms
   (essential for programming Arduino devices and for some embedded targets)
2. No clean method for terminating async read calls when the port is closed; prevents
   the node process from exiting and may leak resources.
3. Does not detect when it's executing in the browser where serial port access isn't allowed
4. Can't find its architecture specific prebuilt libraries when webpack'd at
   runtime by next.js (see following explanation)

The serialport prebuilds tree needs to be found in the directory from where the Node server runs.
For a nextjs app, this is ./.next/server
This is because of how node_modules/node-gyp-build/node-gyp-build.js resolves paths.
However, .next/server gets completely wiped out everytime you do 'npm run dev', so you
can't implant the prebuilts beforehand.

In addition, the serialport project looks quite moribund, with 130+ open issues and no recent
commit activity by anything except renovate-bot.  Some serious issues over a year old have
no human responses.  Basically it's dead unless you can tolerate low functionality and a
lot of headaches.

## Other Resources

[Serial Port Monitor](https://www.com-port-monitoring.com/)

Recent Reddit posts indicate this is likely the best available monitor for sniffing
USBSerial traffic between a 3rd party app and an external device on a Windows host.
You need the $99 pro version for this capability.  This monitor will be needed for
reverse engineering the Stepperonline protocol.

## Setup

### Initial Setup
```
brew install npm  # if needed
# git clone servo-tuna and cd into that dir...
# install react, react-dom, next.js
npm install react@latest react-dom@latest next@latest
# npm install serialport  # deprecated, need replacement!
# npm install child_process # needed by serialport
```

### Resetting Dependencies

`npm install` manipulates package-lock.json in ways that can cause trouble.  `npm ci` is less destructive.
See [discussion here](https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore)

There is some controversy about whether package-lock.json should be gitignore'd but the majority opinion
seems to be that it should be checked into github.

To reset everything:

1. wipe out node_modules with `rm -rf ./node_modules`
2. remove `package-lock.json` or erase all its contents
3. wipe out the `dependencies` entry in `package.json`
4. re-do the `npm install` operations as given above

## Execute


```
npm run dev
# in browser go to localhost:3000
```