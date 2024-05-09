# servo-tuna - Servo tuning app for USB-serial connected motors

This is an embryonic try at creating a cross-platform Node/React based app for tuning USB-serial connected servos.

The initial target is the
(StepperOnline iSV57T)[https://www.omc-stepperonline.com/nema-23-integrated-easy-servo-motor-90w-3000rpm-0-3nm-42-49oz-in-20-50vdc-brushless-dc-servo-motor-isv57t-090]
series of servos.

## Motivation

The StepperOnline iSV57T NEMA 23 servos are very inexpensive ($100 price point) servos with stepper-compataible pulse/dir control and high resolution 32K encoders.
This makes them conceptually very attractive for a number of DIY applications including CNC machine conversions, telescope mount drives, etc.

However the (tuning app)[https://www.omc-stepperonline.com/index.php?route=product/product/get_file&file=1361/iSV-T_software.zip] provided by StepperOnline is execrable.

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
* Effective wide-range auto-tuning
* Drastically improved performance graph functionality and automation
* Extendable to other serial port configured servos like ClearPath, DMM, etc.

## Framework Elements

(Node.js)[https://nodejs.org/en/download/]

(React UI Components)[https://react.dev/learn/start-a-new-react-project]

(Next.js Framework)[https://nextjs.org/]

(Node SerialPort)[https://serialport.io/]
