import { VerifytaResult } from './verifyta_result';
import { exec } from 'child_process';
import { ICmdResult } from './i_cmd_result';
import crypto from 'crypto';
import * as fs from 'fs';
import { resolve } from 'path';

export class VerifytaEnvironment {
  /**
   * Runs verifyta on an xmlfile as string. Returns output of verifyta as ICmdResult.
   * @date 2022-11-04
   * @param xmlFileString
   * The xml file as a string
   * @returns Promise\<ICmdResult\>
   */
  async execute(xmlFileString: string): Promise<ICmdResult> {
    const filepath = this.tempSaveFile(xmlFileString);
${__dirname}infrastructure\\
    console.log(`COMMAND ${command}`);    const command = `${__dirname}\\verifyta_bin\\verifyta.exe`;
    console.log(command);

    // Call verifyta, return result as ICmdResult
    // and delete the temporary file that was created
    const result: Promise<ICmdResult> = new Promise((resolve, _) => {
      exec(command, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
        resolve({
          verifierOutput: stdout,
          verifierError: stderr,
          cmdError: error,
        });
      });
    }).then((res) => {
      fs.unlinkSync(filepath); // Delete temp file
      return res;
    }) as Promise<ICmdResult>;

    return result;
  }

  /**
   * Create a temporary file for the xml string, as verifyta
   * takes the filepath to the xml file. Temporary file will be
   * deleted in execute function.
   * @date 2022-11-04
   * @param contents:string
   * An xml file as a string
   * @returns string
   */
  tempSaveFile(contents: string): string {
    // Create unique name for the xmlfile
    const hashedFilename =
      crypto.createHash('md5').update(contents).digest('hex') + '.xml';

    // Save temerary file
    const filepath = `${__dirname}\\currentRequestXml\\${hashedFilename}`;
    fs.writeFileSync(filepath, contents, {
      flag: 'w+',
    });

    return filepath;
  }
}

const str = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE nta PUBLIC '-//Uppaal Team//DTD Flat System 1.1//EN' 'http://www.it.uu.se/research/group/darts/uppaal/flat-1_2.dtd'>
<nta>
	<declaration>// Place global declarations here.
clock t;
broadcast chan tik;
bool press=0;
</declaration>
	<template>
		<name x="5" y="5">Cround</name>
		<declaration>// Place local declarations here.
</declaration>
		<location id="id0" x="0" y="0">
			<label kind="invariant" x="-51" y="17">t &lt;= 1000</label>
		</location>
		<init ref="id0"/>
		<transition>
			<source ref="id0"/>
			<target ref="id0"/>
			<label kind="guard" x="-34" y="-144">t &gt;= 1000</label>
			<label kind="synchronisation" x="-17" y="-127">tik!</label>
			<label kind="assignment" x="-25" y="-102">t = 0</label>
			<nail x="-51" y="-102"/>
			<nail x="42" y="-102"/>
		</transition>
	</template>
	<template>
		<name>User</name>
		<location id="id1" x="0" y="0">
		</location>
		<init ref="id1"/>
		<transition>
			<source ref="id1"/>
			<target ref="id1"/>
			<label kind="synchronisation" x="-17" y="51">tik?</label>
			<label kind="assignment" x="-34" y="76">press = 0</label>
			<nail x="-59" y="76"/>
			<nail x="51" y="76"/>
		</transition>
		<transition>
			<source ref="id1"/>
			<target ref="id1"/>
			<label kind="synchronisation" x="-17" y="-119">tik?</label>
			<label kind="assignment" x="-33" y="-93">press = 1</label>
			<nail x="-51" y="-93"/>
			<nail x="51" y="-93"/>
		</transition>
	</template>
	<template>
		<name>User3</name>
		<declaration>int count=0;</declaration>
		<location id="id2" x="-68" y="-8">
		</location>
		<init ref="id2"/>
		<transition>
			<source ref="id2"/>
			<target ref="id2"/>
			<label kind="guard" x="-102" y="110">count &gt;= 3</label>
			<label kind="synchronisation" x="-76" y="102">tik?</label>
			<label kind="assignment" x="-93" y="127">press := 1,
count := 0</label>
			<nail x="-102" y="102"/>
			<nail x="-25" y="102"/>
			<nail x="-59" y="8"/>
		</transition>
		<transition>
			<source ref="id2"/>
			<target ref="id2"/>
			<label kind="guard" x="-93" y="-170">count &lt; 3</label>
			<label kind="synchronisation" x="-93" y="-187">tik?</label>
			<label kind="assignment" x="-93" y="-153">count := count + 1,
press := 0</label>
			<nail x="-102" y="-101"/>
			<nail x="-25" y="-101"/>
		</transition>
	</template>
	<template>
		<name>Switch</name>
		<declaration>int x=0;</declaration>
		<location id="id3" x="-425" y="-93">
			<name x="-433" y="-76">off</name>
		</location>
		<location id="id4" x="-178" y="-93">
			<name x="-187" y="-76">on</name>
		</location>
		<init ref="id3"/>
		<transition>
			<source ref="id4"/>
			<target ref="id4"/>
			<label kind="guard" x="-238" y="-238">press == 0 &amp;&amp; x &lt; 10</label>
			<label kind="synchronisation" x="-187" y="-255">tik?</label>
			<label kind="assignment" x="-204" y="-221">x = x + 1</label>
			<nail x="-204" y="-187"/>
			<nail x="-144" y="-187"/>
		</transition>
		<transition>
			<source ref="id3"/>
			<target ref="id3"/>
			<label kind="guard" x="-467" y="-212">press == 0</label>
			<label kind="synchronisation" x="-449" y="-195">tik?</label>
			<nail x="-467" y="-178"/>
			<nail x="-391" y="-178"/>
		</transition>
		<transition>
			<source ref="id4"/>
			<target ref="id3"/>
			<label kind="guard" x="-365" y="-59">press == 1 || x &gt;= 10</label>
			<label kind="synchronisation" x="-306" y="-42">tik?</label>
			<label kind="assignment" x="-314" y="-76">x := 0</label>
			<nail x="-297" y="-76"/>
		</transition>
		<transition>
			<source ref="id3"/>
			<target ref="id4"/>
			<label kind="guard" x="-340" y="-153">press == 1</label>
			<label kind="synchronisation" x="-407" y="-127">tik?</label>
			<nail x="-297" y="-127"/>
		</transition>
	</template>
	<system>system Cround, User3, Switch;
    </system>
	<queries>
		<query>
			<formula>A[] deadlock</formula>
			<comment></comment>
		</query>
		<query>
			<formula>A[] Switch.x &lt; 3</formula>
			<comment></comment>
		</query>
	</queries>
</nta>`;

const env = new VerifytaEnvironment();
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

// C:\\Users\\freja\\OneDrive\\Dokumenter\\AAU\\"6. semester"\\MTPCS\\uppaal64-4.1.26\\bin-Windows\\verifyta.exe -u C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml

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
