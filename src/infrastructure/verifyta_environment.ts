import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';
import { Console } from 'console';

export class VerifytaEnvironment {
  private readonly _result?: VerifytaResult;

  // todo
  constructor() {
    this._result = undefined;
  }

  execute(xmlFile: string): string {
    //throw new Error('not Implemented');
    exec(
      '-Command C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\6. semester\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe -u C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml',
      { shell: 'powershell.exe' },
      (error, stdout, stderr) => {
        stdout.on('data', (data: string) => {Console.log(`Received chunk ${data}`);
      });
      }
    );
    return 'hello!';
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
  }

  get result(): VerifytaResult | undefined {
    return this._result;
  }
}

//{"powershell.exe", "-Command", "C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\6. semester\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe", "-u", "C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml"};
