import { exec } from 'child_process';
import { ICmdResult } from './i_cmd_result';
import crypto from 'crypto';
import * as fs from 'fs';
import Os from 'os';
import { verifytaLinuxPath, verifytaWindowsPath } from './paths';
const SLASH = Os.platform() === 'linux' ? '/' : '\\';

export class VerifytaEnvironment {
  /**
   * Runs verifyta on an xmlfile as string. Returns output of verifyta as ICmdResult.
   * @param xmlFileString The xml file as a string
   * @returns Promise of cmd result from verifyta
   */
  async execute(
    xmlFileString: string,
    queries: string[] | undefined,
  ): Promise<ICmdResult> {
    const modelFilepath = this.saveXmlModelFile(xmlFileString);
    let queryFilePath: string | undefined = undefined;

    const verifytaPath =
      Os.platform() === 'linux' ? verifytaLinuxPath() : verifytaWindowsPath();
    let command = `${verifytaPath} ${modelFilepath}`;

    if (queries) {
      queryFilePath = this.saveQueryFile(queries);
      command += ` ${queryFilePath}`;
    }

    // s: silence-progress, q: no-summary, u: summary
    command += ' -squ';

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
        fs.unlinkSync(modelFilepath); // Delete temp model file
        if (queryFilePath !== undefined) {
          fs.unlinkSync(queryFilePath); // Remove temp query file
        }
        return res;
      })
      .catch((error) => {
        Promise.reject(error);
      }) as Promise<ICmdResult>;

    return result;
  }

  saveQueryFile(queries: string[]): string {
    // Create the query file contents
    const contents = queries.join(Os.EOL);

    // Create unique name for the xmlfile
    const hashedFilename =
      crypto
        .createHash('md5')
        .update(contents + Math.random())
        .digest('hex') + '.q';

    return this.saveFile(contents, hashedFilename);
  }

  /**
   * Create a temporary file for the xml string, as verifyta
   * takes the filepath to the xml file. Temporary file will be
   * deleted in execute function.
   * @param contents
   * An xml file as a string
   * @returns filepath
   */
  saveXmlModelFile(contents: string): string {
    // Create unique name for the xmlfile
    const hashedFilename =
      crypto
        .createHash('md5')
        .update(contents + Math.random())
        .digest('hex') + '.xml';

    return this.saveFile(contents, hashedFilename);
  }

  saveFile(contents: string, name: string): string {
    // Save temerary file
    const seperator = Os.platform() === 'linux' ? '/' : '\\';
    const filepath = `${__dirname}${seperator}currentRequestXml${seperator}${name}`;
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, contents, {
        flag: 'w+',
      });
    } else {
      throw new Error('File path for temporary file already exists');
    }
    return filepath;
  }
}
