import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';

interface ICmdResult {
  verifierOutput: string;
  verifierError: string;
  cmdError?: string;
}

export class VerifytaEnvironment {
  private readonly _result?: VerifytaResult;

  async execute(xmlFilePath: string): Promise<ICmdResult> {
    const command = `C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\"6. semester"\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe -u ${xmlFilePath}`;
    return new Promise((resolve, reject) => {
      exec(command, { shell: 'powershell.exe' }, (error, stdout, stderr) => {
        if (error) {
          reject({
            verifierOutput: stdout,
            verifierError: stderr,
            cmdError: error,
          });
          return;
        }
        resolve({
          verifierOutput: stdout,
          verifierError: stderr,
          cmdError: undefined,
        });
      });
    });
  }
}

const env = new VerifytaEnvironment();
const data = env
  .execute(
    'C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml',
  )
  .then((value) =>
    console.log(
      'err value: ' + value.verifierError + 'out value' + value.verifierOutput,
    ),
  )
  .catch((error) =>
    console.log('stderr:\n' + error.stderr + '\nerror:\n' + error.error),
  );

//console.log('BRAHHH' + data);

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
