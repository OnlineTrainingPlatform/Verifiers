import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';
import { ICmdResult } from './i_cmd_result';
import crypto from 'crypto';
import * as fs from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';
import * as env from '../environment';

export class VerifytaEnvironment {
  /**
   * Runs verifyta on an xmlfile as string. Returns output of verifyta as ICmdResult.
   * @param xmlFileString The xml file as a string
   * @returns Promise of cmd result from verifyta
   */
  async execute(xmlFileString: string): Promise<ICmdResult> {
    const filepath = this.tempSaveFile(xmlFileString);

    const command = `${env.VERIFYTA_PATH} -u ${filepath}`; //TODO: mention env file in readme

    // Call verifyta, return result as ICmdResult and delete the temporary file that was created
    const result: Promise<ICmdResult> = new Promise((resolve, _) => {
      exec(command, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
        resolve({
          verifierOutput: stdout,
          verifierError: stderr,
          cmdError: error == null ? undefined : String(error),
        });
      });
    }).then((res) => {
      fs.unlinkSync(filepath); // Delete temp file
      return res;
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
      crypto.createHash('md5').update(contents).digest('hex') + '.xml';

    // Save temerary file
    const filepath = `${__dirname}\\currentRequestXml\\${hashedFilename}`;
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, contents, {
        flag: 'w+',
      });
    }

    return filepath;
  }
}
