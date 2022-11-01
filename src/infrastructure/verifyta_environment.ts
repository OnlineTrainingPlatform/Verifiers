import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';
import { ICmdResult } from './i_cmd_result';
import crypto from 'crypto';
import * as fs from 'fs';
import { resolve } from 'path';

export class VerifytaEnvironment {
  private readonly _result?: VerifytaResult;

  tempSaveFile(contents: string): string {
    const hashedFilename =
      crypto.createHash('md5').update(contents).digest('hex') + '.xml';
    const filepath = `${__dirname}\\currentRequestXml\\${hashedFilename}`;
    fs.writeFileSync(filepath, contents, {
      flag: 'w+',
    });

    return filepath;
  }

  async readFile(filepath: string) {
    const xmlContents = fs.readFileSync(filepath);

    return xmlContents;
  }

  async execute(xmlFileString: string): Promise<ICmdResult> {
    const filepath = this.tempSaveFile(xmlFileString);
    const command = `C:\\Users\\ax111\\Desktop\\uppaal64-4.1.26-1\\bin-Windows\\verifyta.exe -u ${filepath}`;

    // super ugly, basically call verifyta, return result as ICmdResult
    // and delete the temporary file that was created
    const result: Promise<ICmdResult> = new Promise((resolve, reject) => {
      exec(command, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
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
    }).then((res) => {
      fs.unlinkSync(filepath); // delete temp file
      return res;
    }) as Promise<ICmdResult>;

    return result;
  }
}

const str = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE nta PUBLIC '-//Uppaal Team//DTD Flat System 1.1//EN' 'http://www.it.uu.se/research/group/darts/uppaal/flat-1_2.dtd'>
<nta>
	<declaration>// Place global declarations here.
clock x, y;</declaration>
	<template>
		<name x="5" y="5">Proc</name>
		<declaration>// Place local declarations here.</declaration>
		<location id="id0" x="-170" y="34">
			<name x="-180" y="0">A</name>
			<label kind="invariant" x="-180" y="51">x&lt;=5</label>
		</location>
		<location id="id1" x="-34" y="34">
			<name x="-44" y="0">B</name>
			<label kind="invariant" x="-44" y="51">x&lt;=7</label>
		</location>
		<location id="id2" x="102" y="34">
			<name x="92" y="0">C</name>
			<label kind="invariant" x="92" y="51">x&lt;=8</label>
		</location>
		<location id="id3" x="204" y="-34">
			<name x="194" y="-68">D</name>
		</location>
		<location id="id4" x="238" y="34">
			<name x="228" y="0">E</name>
		</location>
		<location id="id5" x="204" y="102">
			<name x="194" y="68">F</name>
		</location>
		<init ref="id0"/>
		<transition>
			<source ref="id2"/>
			<target ref="id5"/>
			<label kind="guard" x="136" y="76">x==7</label>
		</transition>
		<transition>
			<source ref="id2"/>
			<target ref="id4"/>
			<label kind="guard" x="153" y="8">x&lt;=4</label>
		</transition>
		<transition>
			<source ref="id2"/>
			<target ref="id3"/>
			<label kind="guard" x="136" y="-34">y&gt;=6</label>
		</transition>
		<transition>
			<source ref="id1"/>
			<target ref="id2"/>
			<label kind="guard" x="-8" y="8">y&gt;=4</label>
			<label kind="assignment" x="59" y="34">y=0</label>
		</transition>
		<transition>
			<source ref="id0"/>
			<target ref="id1"/>
			<label kind="guard" x="-153" y="8">x&gt;=3</label>
		</transition>
	</template>
	<system>system Proc;
    </system>
	<queries>
		<query>
			<formula>E&lt;&gt; Proc.F</formula>
			<comment></comment>
		</query>
		<query>
			<formula>E&lt;&gt; Proc.E</formula>
			<comment></comment>
		</query>
		<query>
			<formula>E&lt;&gt; Proc.D</formula>
			<comment></comment>
		</query>
		<query>
			<formula></formula>
			<comment></comment>
		</query>
	</queries>
</nta>
`;

const env = new VerifytaEnvironment();
//const f = env.tempSaveFile('<name x="5" y="5">Proc</name>');

const data = env
  .execute(str)
  .then((value) =>
    console.log(
      'err value: ' + value.verifierError + 'out value' + value.verifierOutput,
    ),
  )
  .catch((error) =>
    console.log(
      'stderr:\n' +
        error.verifierError +
        '\nerror:\n' +
        error.cmdError +
        'stdout: ' +
        error.verifierOutput,
    ),
  );

//console.log(fs.readFileSync('/test_file.xml', 'utf8')); // World!

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
