import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';

export class VerifytaEnvironment {
  private readonly _result?: VerifytaResult;

  // todo
  constructor() {
    this._result = undefined;
  }

  execute(xmlFilePath: string): string {
    //throw new Error('not Implemented');
    let data = '';
    console.log('START');
    exec(
      `C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\"6. semester"\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe -u ${xmlFilePath}`,
      { shell: 'powershell.exe' },
      (error, stdout, stderr) => {
        if (stderr) {
          console.log('ERROR');
          data = stderr;
        } else {
          console.log('STDOUT');
          data = stdout;
        }
      },
    );
    return data;
  }

  get result(): VerifytaResult | undefined {
    return this._result;
  }
}

const env = new VerifytaEnvironment();
const data = env.execute('blabla');
console.log(data);

// stdout.on('data', (data: string) => {
//   console.log(`Received chunk ${data}`);
// });

// C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\"6. semester"\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe -u C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml

// C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\6. semester\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe", "-u", "C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml"};

// let spawn = require('child_process').spawn;
// child = spawn('powershell.exe', ['-Command', 'C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\6. semester\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe', '-u', 'C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml']);

// child.stdout.on('data', function (data) {
//   console.log('Powershell Data: ' + data);
// });
// child.stderr.on('data', function (data) {
//   console.log('Powershell Errors: ' + data);
// });
// child.on('exit', function () {
//   console.log('Powershell Script finished');
// });
// child.stdin.end(); //end input

//{"powershell.exe", "-Command", "C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\6. semester\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe", "-u", "C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml"};
