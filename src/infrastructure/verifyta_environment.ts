import { exec } from 'child_process';
import { ICmdResult } from './i_cmd_result';
import crypto from 'crypto';
import * as fs from 'fs';
import * as env from '../environment';
import Os from 'os';
import { verifytaLinuxPath, verifytaWindowsPath } from './paths';

export class VerifytaEnvironment {
  /**
   * Runs verifyta on an xmlfile as string. Returns output of verifyta as ICmdResult.
   * @param xmlFileString The xml file as a string
   * @returns Promise of cmd result from verifyta
   */
  async execute(xmlFileString: string): Promise<ICmdResult> {
    const filepath = this.tempSaveFile(xmlFileString);

    const verifytaPath =
      Os.platform() === 'linux' ? verifytaLinuxPath() : verifytaWindowsPath();
    const command = `${verifytaPath} -u ${filepath}`;

    const shell = Os.platform() === 'linux' ? undefined : 'CMD.exe';

    // Call verifyta, return result as ICmdResult and delete the temporary file that was created
    const result: Promise<ICmdResult> = new Promise((resolve, _) => {
      exec(command, { shell }, (error, stdout, stderr) => {
        resolve({
          verifierOutput: stdout,
          verifierError: stderr,
          cmdError: error == null ? undefined : String(error),
        });
      });
    })
      .then((res) => {
        fs.unlinkSync(filepath); // Delete temp file
        return res;
      })
      .catch((error) => {
        Promise.reject(error);
      }) as Promise<ICmdResult>;

    return result;
  }

  // TODO: input string is not formatted correctly, so file is saved formatting badly...
  /**
   * Create a temporary file for the xml string, as verifyta
   * takes the filepath to the xml file. Temporary file will be
   * deleted in execute function.
   * @param contents
   * An xml file as a string
   * @returns filepath
   */
  tempSaveFile(contents: string): string {
    // Create unique name for the xmlfile
    const hashedFilename =
      crypto
        .createHash('md5')
        .update(contents + Math.random())
        .digest('hex') + '.xml';

    // Save temerary file
    const seperator = Os.platform() === 'linux' ? '/' : '\\';
    const filepath = `${__dirname}${seperator}currentRequestXml${seperator}${hashedFilename}`;
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, contents, {
        flag: 'w+',
      });
    }

    return filepath;
  }
}
