//import { SerialPort } from 'serialport';


// It appears that serialport only works on the server side.  Makes sense
// because the browser side is sandboxed and can't manipulate local HW.
// However, it doesn't tell you that your code won't work, when it easily could.
// on the client, process.platform is undefined (process.name == "browser")
// and you get a runtime error when serialport defaults to Linux due to the logic in
// ./node_modules/@serialport/bindings-cpp/dist/index.js
// serialport doesn't fall back to os.platform() if process.platform is undef
// See related analysis in https://github.com/vercel/pkg/issues/1660

export default function SerPortList() {
    //console.log(process.platform);
    // const mybind = autoDetect();
    // console.log(mybind);

    // serialport.list().then (
    //     ports => ports.forEach(port => console.log(port.path)),
    //     err => console.log(err)
    // )
}